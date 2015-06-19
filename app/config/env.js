var env = process.env.NODE_ENV || 'dev';

var config = {
	'dev': {
		scheme: 'http:',
		hostname: 'localhost',
		port: 9003,
		db: 'mongodb://localhost/local'
	},
	'prod': {
		scheme: 'http:',
		port: 8080,
		hostname: '127.0.0.1',
		db: 'mongodb://localhost/personal-site'
	}
};

module.exports = config[env];
