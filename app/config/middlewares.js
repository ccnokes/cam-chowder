var express = require('express'),
	bodyParser = require('body-parser'),
	responseTime = require('response-time'),
	appConstants = require('./app-constants'),
	app = require('./app-boot'),
	paginate = require('express-paginate'),
	helmet = require('helmet'),
	env = require('./env'),
	passport = require('passport'),
	logger = require('./logger'),
	expressWinston = require('express-winston');


//mirror browser console to node console
if(appConstants.env === 'dev') {
	require('node-monkey').start();	
}

//adds response time header to response
app.use(responseTime());


//static paths
app.use(express.static(appConstants.distPath));
//virtual "mount path" for uploads so not all served from root
app.use('/uploads', express.static(appConstants.uploadsPath));


//parse application/json
app.use(bodyParser.json({
	//parse csp-reports as JSON
	type: ['json', 'application/csp-report']
}));

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());


//app.use(express.favicon(config.root + '/public/img/favicon.ico'));

app.use(paginate.middleware());

//security
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.noSniff());


app.use(expressWinston.logger({
	winstonInstance: logger.errorLog
}));


//CSP
// app.use(helmet.contentSecurityPolicy({
// 	defaultSrc: ["'self'"],
// 	scriptSrc: ["'self'", "'unsafe-eval'", 'www.google-analytics.com', 'localhost:8080'],
// 	styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
// 	fontSrc: ["'self'", 'fonts.gstatic.com'],
// 	imgSrc: ["'self'", 'data:', 'www.google-analytics.com'],
// 	connectSrc: ["'self'", "ws:"],
// 	reportUri: '/csp-violation',
// 	setAllHeaders: false // set to true if you want to set all headers (X-Webkit-Content-Security-Policy, etc...)
// }));

//fake latency for testing
// app.use(function(req, res, next) {
// 	setTimeout(next, 1000);
// });