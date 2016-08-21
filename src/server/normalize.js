'use strict';

var pogobuf = require('pogobuf');
var POGOProtos = require('node-pogo-protos').Enums;

var pokedexPolyFill = require('./dummyData/pokedex.json'); //thanks https://github.com/Biuni/PokemonGOPokedex

function normalize(inventory) {

	// check inventory object	
	if(inventory.success !== true) {
		return false;
	}
	
	// organize inventory
	inventory = pogobuf.Utils.splitInventory(inventory);	

	// break out inventory
	const player = inventory.player;
	const pokemon = inventory.pokemon.filter(obj => !obj.is_egg && obj.pokemon_id !== 0); //filter out eggs
	//const eggs = inventory.pokemon.filter(obj => obj.is_egg);	
	const pokedex = inventory.pokedex;
	const candy = inventory.candies; 

	// prepare response obj
	const data = {
		player: player,
		pokemon: pokemon, 
		pokedex: polyFill(pokedex), // havn't figured out how to get all the required data yet 
		candy: candy.reduce((map,candy) => { map[candy.family_id.toString()] = candy; return map; },{}), //convert to map with family_id keys
		proto: getProto(['PokemonMove'])
	};
	return data;
};

function polyFill(pokedex) {
	
	// create keyed pokedex from supplementary data
	const pokedexLookup = pokedexPolyFill.pokemon.reduce((map,item) => {
	         map[item.id.toString()] = item;
		 return map;
	},{});
	
	// create keyed proto lookup	
	const protoLookup = getProto(['PokemonId','PokemonFamilyId']); 
		

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

function getProto(neededValues) {
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

// exports
module.exports = normalize;
