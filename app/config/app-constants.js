var path = require('path'),
	fs = require('fs'),
	crypto = require('crypto'),
	env = process.env.NODE_ENV || 'dev';

var root = path.normalize(__dirname + '/../..');

var version = null;
try {
	version = JSON.parse(fs.readFileSync(path.resolve(root, 'package.json'))).version;
} catch(e) {
	console.error(e);
}

const constants = {
	env: env,
	version: version,
	cspHash: crypto.createHash('sha256').update('kittens!' + version).digest('hex'),
	rootPath: root,
	appPath: path.join(root, 'app'),
	publicPath: path.join(root, 'public'),
	viewsPath: path.join(root, 'app/views')
};

module.exports = constants;