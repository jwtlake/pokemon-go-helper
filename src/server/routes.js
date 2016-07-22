'use strict';

const routes = [
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
