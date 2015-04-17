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



//virtual host
var vhostApp = express();
vhostApp.use(vhost(env.hostname, app));
vhostApp.listen(env.port);

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
autoload(['models', 'controllers']);




//register backup routes, 404s and such. These must come last
var router = express.Router();

router.use(function(req, res) {
	//if expecting JSON, send that
	if(req.headers['content-type'] === 'application/json') {
		res.status(404).json({success: false, error: true, msg: 'Resource does not exist.'});
	} 
	//otherwise send 404.html
	else {
		res.status(404).render('404', { title: '404 :(' });
	}
});

//mount the router in the app
app.use(router);