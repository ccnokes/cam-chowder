var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	responseTime = require('response-time'),
	compression = require('compression');

module.exports = function(app, config) {
	//adds response time header to response
	app.use(responseTime());

	//set some global vars
	app.set('port', config.port);
	app.set('APIversion', 1.0);
	app.set('models', path.join(config.root, '/app/models'));
	app.set('views', path.join(config.root, 'app/views') );
	app.set('controllers', path.join(config.root, '/app/controllers'));
	app.set('view engine', 'jade');
	app.set('siteTitle', 'The Site of Cameron Nokes');

	//enable gzip compression on responses > 512b
	app.use(compression({
		threshold: 512
	}));

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

	//routes
	require('./routes.js')(app);

	//if no route matches, send a 404
	app.use(function(req, res) {
		res.status(404).render('404', { title: '404' });
	});

};
