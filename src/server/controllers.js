'use strict';

var pogobuf = require('pogobuf');

module.exports = {

	login: function(request, reply) {

		// get user info	
		var username = request.payload.user;
		var password = request.payload.pass;
		var type = request.payload.type; // google || ptc
		var latitude = request.payload.lat;
		var longitude = request.payload.lnd;
		var altitude = request.payload.alt;		
		
		//log connection attempt for debugging
		console.log(`login attempt -- user: ${username} pass: $$$$ type: ${type} lat: ${latitude} lnd: ${longitude} alt: ${altitude}`);	

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
	const pokemon = getInvData(rawInvArray,'pokemon_data'); 
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
		pokemon: pokemon,
		pokedex: pokedex,
		family: family	
	};
	return data;
	
	// helper function
	function getInvData(rawInvArray, key) {
		return rawInvArray.filter(rawInv => rawInv[key]).map(rawInv => rawInv[key]);
	}
};
