'use strict';

var Joi = require('joi');
var controllers = require('./controllers');

var routes = [
	{
		method: 'POST',
		path: '/api/login',
		handler: controllers.login,
		config: {
			validate: {
				payload: {
					user: Joi.string().alphanum().min(1).required(),
					pass: Joi.string().min(1).required(),
					type: Joi.any().valid('google','ptc').required(),	
					lat: Joi.number().required(),
					lnd: Joi.number().required(),
					alt: Joi.number().required()
				}	
			}	
	}
	},
	{
		method: 'GET',
		path: '/bundle.js',
		handler: (request, reply) => {
			reply.file(appRoot + '/src/client/public/bundle.js');
		}	
	},
	{
		method: 'GET',
		path: '/index.css',
		handler: (request, reply) => {
			reply.file(appRoot + '/src/client/public/index.css');	
		}
	},
	{
		method: 'GET',
		path: '/{path*}',
		handler: (request, reply) => {
			reply.file(appRoot + '/src/client/public/index.html');	
		}

	}
];

// export
module.exports = routes;
