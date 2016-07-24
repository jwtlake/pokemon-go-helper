'use strict';

var PokemonGO = require('pokemon-go-node-api');

module.exports = {

	login: function(request, reply) {

		// get user info	
		var username = request.payload.user;
		var password = request.payload.pass;
		var type = request.payload.type; // google || ptc
		var location = {
			type:'coords',
			coords: {
				latitude: request.payload.lat,
				longitude: request.payload.lnd,
				altitude: request.payload.alt		
			}	
		}

		// create new instance
		var pokemonGoInstance = new PokemonGO.Pokeio();

		// login
		pokemonGoInstance.init(username, password, location, type, (err) => {
			if (err) { reply(err).code(500); console.log(err); };
			
			// get info 
			pokemonGoInstance.GetProfile((err, profile) => {	
				if (err) { reply(err).code(500); console.log(err); };
				
				console.log('1[i] Username: ' + profile.username);
				console.log('1[i] Poke Storage: ' + profile.poke_storage);
				console.log('1[i] Item Storage: ' + profile.item_storage);

				that.reply('hey').code(200);
			});
		});		
	}
};
