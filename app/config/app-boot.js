var express = require('express'),
	mongoose = require('mongoose'),
	path = require('path'),
	env = require('./env'),
	autoload = require('./auto-load'),
	errorLog = require('./logger').errorLog,
	appConstants = require('./app-constants');

//boom
var app = express();

//make app instance available as export
module.exports = app;

app.listen(env.port);
console.log('server started at: ', env.hostname + ':' + env.port);



//connect to DB
mongoose.connect(env.db, env.dbOpts);
var db = mongoose.connection;

db.on('error', exitHandler);


function exitHandler(err) {
    if (err) {
    	errorLog.error(err.message);
    }

    mongoose.disconnect();
    process.exit();
}

//handles ctrl+c event
process.on('SIGINT', exitHandler);

//handles termination signal
process.on('SIGTERM', exitHandler);

//handles uncaught exceptions
process.on('uncaughtException', exitHandler);


//set some global vars
app.set('view engine', 'ejs');


//add middlewares
require('./middlewares');


//do some auto-loading (TODO: this was a bad idea)
//path is relative to app/
autoload('**/*-model.js');
//mount router defined in controllers to app
autoload('**/*-ctrl.js', function(mod, file) {
	//*note: this means that controller routers should not be order dependent
	if(mod.router) {
		//console.log(mod.router.stack);
		app.use(mod.router);
	}
});


//create initial sitemap on server start
require('../utilities/sitemap-generator.js').renderSitemap();



//register backup routes, 404s and such. These must come last
var router = express.Router();
var viewCtrl = require('../views/view-ctrl');

router.use(function(req, res, next) {
	//if expecting JSON, send that
	if(req.headers['content-type'] === 'application/json') {
		res.status(404).json({
			message: 'Resource does not exist.'
		});
	}
	//otherwise send 404 html
	else {
		res.status(404);
		//this is a little strange and an unfortunate side effect of auto-loading all controllers
		//and embedding routers in each controller
		viewCtrl.render(req, res);
	}
});

//mount the router in the app
app.use(router);
