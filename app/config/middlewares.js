var express = require('express'),
	bodyParser = require('body-parser'),
	responseTime = require('response-time'),
	compression = require('compression'),
	appConstants = require('./app-constants'),
	app = require('./app-boot'),
	paginate = require('express-paginate'),
	helmet = require('helmet'),
	expressJwt = require('express-jwt'),
	env = require('./env');


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

//lock down access to current domain only
// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', env.scheme + '//' + env.hostname);
// 	next();
// });

//parse application/json
app.use(bodyParser.json({
	//parse csp-reports as JSON
	type: ['json', 'application/csp-report']
}));

// parse application/json
app.use(bodyParser.json());


// app.use('/api',
// 	expressJwt({secret: 'meow'})
// );

//handle above unauthorized responses
app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({message: 'Invalid token, unauthorized.'});
	}
	else {
		next();
	}
});


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
	styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
	fontSrc: ["'self'", 'fonts.gstatic.com'],
	imgSrc: ["'self'", 'data:'],
	connectSrc: ["'self'", "ws:"],
	reportUri: '/csp-violation',
	setAllHeaders: false // set to true if you want to set all headers (X-Webkit-Content-Security-Policy, etc...)
}));

//fake latency for testing
// app.use(function(req, res, next) {
// 	setTimeout(next, 1000);
// });