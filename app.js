var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('./config/config'),
  vhost = require('vhost');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

//virtual host, not sure how it works
var vhostApp = express();
vhostApp.use(vhost(config.hostname, app));

require('./config/express')(app, config);
require('./config/routes')(app);

vhostApp.listen(config.port);