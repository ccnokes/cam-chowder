var express = require('express'),
	path = require('path'),
	vhost = require('vhost'),
	config = require('./config.js');

//boom
var app = express();

//virtual host, not sure how it works
var vhostApp = express();
vhostApp.use(vhost(config.hostname, app));
vhostApp.listen(config.port);


//set some global vars
app.set('port', config.port);
app.set('APIversion', 1.0);
app.set('models', path.join(config.root, '/app/models'));
app.set('views', path.join(config.root, 'app/views') );
app.set('controllers', path.join(config.root, '/app/controllers'));
app.set('view engine', 'jade');
app.set('siteTitle', 'CameronNokes.com');


//make app instance available as export
module.exports = app;