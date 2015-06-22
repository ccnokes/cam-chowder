var express = require('express'),
	mongoose = require('mongoose'),
	path = require('path'),
	vhost = require('vhost'),
	env = require('./env'),
	autoload = require('./auto-load');

//boom
var app = express();

//make app instance available as export
module.exports = app;

app.listen(env.port);
console.log('server started at: ', env.hostname + ':' + env.port);

//connect to DB
mongoose.connect(env.db);
var db = mongoose.connection;
db.on('error', function () {
	throw new Error('unable to connect to database at ' + env.db);
});


//set some global vars
app.set('view engine', 'ejs');


//add middlewares
require('./middlewares');


//do some auto-loading
//path is relative to app/
autoload('**/*-model.js');
//mount router defined in controllers to app
autoload('**/*-ctrl.js', function(mod, file) {
	//*note: this means that controller routers should not be order dependent
	if(mod.router) {
		app.use(mod.router);
	}
});




//register backup routes, 404s and such. These must come last
var router = express.Router();

router.use(function(req, res, next) {
	//if expecting JSON, send that
	if(req.headers['content-type'] === 'application/json') {
		res.status(404).json({
			message: 'Resource does not exist.'
		});
	} 

	next();
	//otherwise send 404.html
	// else {
	// 	res.status(404).render('404', { title: '404 :(' });
	// }
});

//mount the router in the app
app.use(router);