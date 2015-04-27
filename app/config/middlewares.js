var express = require('express'),
	bodyParser = require('body-parser'),
	responseTime = require('response-time'),
	compression = require('compression'),
	appConstants = require('./app-constants'),
	app = require('./app-boot'),
	paginate = require('express-paginate'),
	helmet = require('helmet');


//mirror browser console to node console
if(appConstants.env === 'dev') {
	require('node-monkey').start();	
}

//adds response time header to response
app.use(responseTime());

//enable gzip compression on responses > 512b
app.use(compression({
	threshold: 512
}));

//serve public as web root
app.use(express.static(appConstants.distPath));

// parse application/json
app.use(bodyParser.json());

//app.use(express.favicon(config.root + '/public/img/favicon.ico'));

app.use(paginate.middleware());

//security
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.noSniff());

//CSP
app.use(helmet.contentSecurityPolicy({
	defaultSrc: ["'self'"],
	scriptSrc: ["'self'", "'nonce-" + appConstants.cspHash + "'", "'unsafe-eval'"],
	styleSrc: ["'self'", "'unsafe-inline'"],
	imgSrc: ["'self'", 'data:'],
	connectSrc: ["'self'", "ws:"],
	reportUri: '/csp-violation',
	setAllHeaders: false // set to true if you want to set all headers (X-Webkit-Content-Security-Policy, etc...)
}));