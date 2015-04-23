var path = require('path'),
	fs = require('fs'),
	crypto = require('crypto');

var root = path.normalize(__dirname + '/../..');

var version = null;
try {
	version = JSON.parse(fs.readFileSync(path.resolve(root, 'package.json'))).version;
} catch(e) {
	console.error(e);
}

const constants = {
	version: version,
	cspHash: crypto.createHash('sha256').update('kittens!' + version).digest('hex'),
	rootPath: root,
	appPath: path.join(root, 'app'),
	publicPath: path.join(root, 'public'),
	modelsPath: path.join(root, '/app/models'),
	viewsPath: path.join(root, 'app/views'),
	controllersPath: path.join(root, '/app/controllers')
};

module.exports = constants;