'use strict';

//set app root
global.appRoot = require('path').resolve(__dirname);

//include server js
module.exports = require(appRoot + '/src/server/');
