var express = require('express'),
	bodyParser = require('body-parser'),
	responseTime = require('response-time'),
	compression = require('compression'),
	appConstants = require('./app-constants'),
	app = require('./app-boot'),
	paginate = require('express-paginate');

//TODO if env === 'dev'
require('node-monkey').start();

//adds response time header to response
app.use(responseTime());

//enable gzip compression on responses > 512b
app.use(compression({
	threshold: 512
}));

//serve public as web root
app.use(express.static(appConstants.publicPath));

// parse application/json
app.use(bodyParser.json());

//app.use(express.favicon(config.root + '/public/img/favicon.ico'));

app.use(paginate.middleware());