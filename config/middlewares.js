var express = require('express'),
	app = require('./app-boot.js'),
	path = require('path'),
	fs = require('fs'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	responseTime = require('response-time'),
	compression = require('compression'),
	config = require('./config.js');


//adds response time header to response
app.use(responseTime());

//enable gzip compression on responses > 512b
app.use(compression({
	threshold: 512
}));

//serve public as web root
app.use(express.static(config.root + '/public'));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

//app.use(express.favicon(config.root + '/public/img/favicon.ico'));

//logging
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}));

