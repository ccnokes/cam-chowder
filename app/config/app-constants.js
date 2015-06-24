var path = require('path'),
	fs = require('fs'),
	crypto = require('crypto'),
	env = process.env.NODE_ENV || 'dev';

var root = path.normalize(__dirname + '/../..');

var version = null;
var authSecret = null;
try {
	version = JSON.parse(fs.readFileSync(path.resolve(root, 'package.json'))).version;
	//authSecret = JSON.parse(fs.readFileSync(path.join(__dirname, 'auth-secret.json'))).secret;
} catch(e) {
	console.error(e);
}

const constants = {
	env: env,
	version: version,
	//authSecret: crypto.createHash('sha256').update(authSecret).digest('hex'),
	rootPath: root,
	appPath: path.join(root, 'app'),
	publicPath: path.join(root, 'public'),
	distPath: path.join(root, 'dist'),
	viewsPath: path.join(root, 'app/views'),
	uploadsPath: path.join(root, 'uploads'),
	logsPath: path.join(root, 'logs')
};

module.exports = constants;