var app = require('./app-boot.js'),
	fs = require('fs');

//auto load models
var modelPath = app.get('models');

fs.readdirSync( modelPath ).forEach(function (file) {
	if (file.indexOf('.js') >= 0) {
		require(modelPath + '/' + file);
	}
});

