var path = require('path');

var root = path.normalize(__dirname + '/../..');

const constants = {
	rootPath: root,
	appPath: path.join(root, 'app'),
	publicPath: path.join(root, 'public'),
	modelsPath: path.join(root, '/app/models'),
	viewsPath: path.join(root, 'app/views'),
	controllersPath: path.join(root, '/app/controllers')
};

module.exports = constants;