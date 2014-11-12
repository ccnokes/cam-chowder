var express = require('express'),
	mongoose = require('mongoose'),
	fs = require('fs'),
	config = require('./config/config');

//connect to DB
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
	throw new Error('unable to connect to database at ' + config.db);
});

//instantiate global app
var app = require('./config/app-boot');

//add more middlewares
require('./config/middlewares');

//do some auto-loading
require('./config/auto-load');

//register all routes
require('./config/routes')();