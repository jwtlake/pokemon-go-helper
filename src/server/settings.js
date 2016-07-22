'use strict';

// libary for settings
const nconf = require('nconf');

// example config
const defaults = {
	hapi:{
		port:3000
	}
};

// set default settings
nconf.defaults(defaults);

// export
module.exports = nconf;
