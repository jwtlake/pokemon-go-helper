'use strict';

var pogobuf = require('pogobuf');
var POGOProtos = require('node-pogo-protos').Enums;

var pokedexPolyFill = require('./dummyData/pokedex.json'); //thanks https://github.com/Biuni/PokemonGOPokedex

module.exports = {

	login: function(request, reply) {

		// get user info	
		var username = request.payload.user;
		var password = request.payload.pass;
		var type = request.payload.type; // google || ptc
		var latitude = request.payload.lat;
		var longitude = request.payload.lnd;
		var altitude = request.payload.alt;		

		// debug response
		if(username.toLowerCase() === 'test' && password.toLowerCase() === 'test') {
			var dummyResponse = require('./dummyData/response.json'); 
			console.log(`login attempt -- user:${username} pass:**** type:${type} lat:${latitude} lnd:${longitude} alt:${altitude}`);	
			reply(dummyResponse);
			return;
		}

		// create instance	
		var login;
		var provider;
		if(type === 'google'){
			login = new pogobuf.GoogleLogin();
			provider = 'google';
		} else {
			login = new pogbuf.PTCLogin();
			provider = 'ptc';	
		}	
    		var client = new pogobuf.Client();

		// login and return inventory 
		login.login(username,password)
		.then(token => {
			client.setAuthInfo(provider, token);
    			client.setPosition(latitude, longitude);
    			return client.init();
		}).then(() => {
			return client.getInventory(0);
		}).then(inventory => {
			// format inventory response
			const response = normalize(inventory); 	
			// check for errors	
			if(response) {
				reply(response).code(200);	
			} else {
				reply().code(401);	
			}

		});		
	}
}

function normalize(response) {
	// fail out
	if(response.success !== true) {
		return false;
	}
	
	// get inventory array	
	const rawInvArray = response.inventory_delta.inventory_items.map(inv => inv.inventory_item_data);

	// get required sections
	const pokemon = getInvData(rawInvArray,'pokemon_data').filter(obj => !obj.is_egg && obj.pokemon_id !== 0);
       	//const eggs = getInvData(rawInvArray,'pokemon_data').filter(obj => obj.is_egg);	
	const pokedex = getInvData(rawInvArray,'pokedex_entry'); 
	//const items = getInvData(rawInvArray,'item'); 
	//const playerStats = getInvData(rawInvArray,'player_stats'); 
	const family = getInvData(rawInvArray,'pokemon_family'); 
	// const player_currency = getInvData(rawInvArray,'player_currency');  
	// const player_camera = getInvData(rawInvArray,'player_camera'); 
	// const inventory_upgrades = getInvData(rawInvArray,'inventory_upgrades'); 
	// const applied_items = getInvData(rawInvArray,'applied_items'); 
	
	// return	
	const data = {
		player: { name: "dummy", level: 10, exp: 10000 }, //TODO figure out how best to handle this 	
		pokemon: pokemon,
		pokedex: polyFill(pokedex), // havn't figured out how to get all the required data yet 
		candy: family.reduce((map,candy) => { map[candy.family_id.toString()] = candy; return map; },{}), //convert to map with family_id keys
		proto: getProto()
	};
	return data;
	
	// helper function
	function getInvData(rawInvArray, key) {
		return rawInvArray.filter(rawInv => rawInv[key]).map(rawInv => rawInv[key]);
	}
};

function polyFill(pokedex) {
	
	// create keyed pokedex from supplementary data
	const pokedexLookup = pokedexPolyFill.pokemon.reduce((map,item) => {
	         map[item.id.toString()] = item;
		 return map;
	},{});
	
	// create keyed proto lookup	
	const protoLookup = getProto(); 
		

	// convert to map of keys and add missing data to pokedex
	return pokedex.reduce((map,entry) => {
		const pokemonId = entry.pokemon_id.toString();

		//add missing info
		entry.name = protoLookup.PokemonId[pokemonId]; 
		entry.candyToEvolve = pokedexLookup[pokemonId].candy; // TODO can I get from somewhere else? 
		entry.family_id = getFamilyId(pokemonId,protoLookup.PokemonFamilyId); 		
		entry.img = pokedexLookup[pokemonId].img; //TODO can I get this from somewhere else?
		
		//return as map/key value	
		map[pokemonId] = entry; 
		return map;
	},{});

	// helper function
	function getFamilyId(pokemonId,familyLookup) {
		var lookupNumber = parseInt(pokemonId);

		// Pokemon family records are stored by the lowest form pokemons pokemon_id. 
		// To find a pokemon's family this function checks for the pokemon_id in the family proto lookup, if there is no record (means its an evolved form) then subtract 1 and check the previous pokemon.
		do {
			const familyId = lookupNumber.toString()	
			if(familyId in familyLookup) {
				return lookupNumber;
			} else {
				lookupNumber--;	
			}	

		} while (lookupNumber >= 1 );

		// fail out	
		return 0;	
	}
}

function getProto() {

	// proto values to get
	var neededValues = ['PokemonMove','PokemonId','PokemonFamilyId'];
	
	// return proto enum in json friendly format
	return neededValues.reduce((map,value) => {
		map[value] = keyValueSwap(POGOProtos[value]);  
		return map;	
	},{});

	// helper function
	function keyValueSwap(enumObj) {
		return Object.keys(enumObj).reduce((map,key) => {
			map[enumObj[key]] = key;
			return map;	
		},{});
	}
}
