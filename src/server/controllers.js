'use strict';

var pogobuf = require('pogobuf');
var GoogleAPI = require('./google_login');
var normalize = require('./normalize');

module.exports = {

	login: function(request, reply) {

		// get user info	
		var username = request.payload.auth.user;
		var password = request.payload.auth.pass;
		var type = request.payload.auth.type; // google || ptc
		var token = request.payload.auth.token;
		var latitude = request.payload.lat;
		var longitude = request.payload.lnd;
		var altitude = request.payload.alt;		

		// debug response
		if(type === 'google') {
			// normal login
			console.log(`login attempt -- type:${type} token:${token} lat:${latitude} lnd:${longitude} alt:${altitude}`);	
		} else {
			// check for special debug login (skips normal login and passes test data)
			if(username.toLowerCase() === 'test' && password.toLowerCase() === 'test') {
			
				// get pre-normalize response	
				var dummyResponse = require('./dummyData/response.json'); 
				console.log(`pre-normalized test`);	
				reply(dummyResponse);
				return;
			} else if(username.toLowerCase() === 'testraw' && password.toLowerCase() === 'test') {
			
				// get dummy raw response and normalize	
				var dummyRawResponse = require('./dummyData/raw_response.json'); 
				console.log(`raw test`);	
				reply(normalize(dummyRawResponse));
				return;
			} else {
			
				// else normal login
				console.log(`login attempt -- type:${type} user:${username} pass:**** lat:${latitude} lnd:${longitude} alt:${altitude}`);	
			}
		}

		// create instance	
		var login;
		var loginProcess;
		var provider;	
		
		if(type === 'google'){
			// login with google auth token
			loginProcess = new GoogleAPI().login(token);
			provider = 'google';
		} else {
			// login with username and password	
			loginProcess = new pogobuf.PTCLogin().login(username,password);
			provider = 'ptc';	
		}	

		var client = new pogobuf.Client();

		// login and return inventory 
		loginProcess
		.then(token => {
			client.setAuthInfo(provider, token);
			client.setPosition(latitude, longitude);
    			return client.init();
		}).then(() => {
			return client.getInventory(0);
		}).then(inventory => {
			// format inventory response
			const response = normalize(inventory); 	
			
			if(response) {
				reply(response).code(200);	
			}

		}).catch(error => {
			console.log(error);
			reply(error).code(401);
	       	});		
	}
}
