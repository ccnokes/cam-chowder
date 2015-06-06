var env = process.env.NODE_ENV || 'development';

var config = {
	development: {
		scheme: 'http:',
		hostname: 'cameron.dev',
		port: 9003,
		db: 'mongodb://localhost/local'
	},
	production: {
		scheme: 'http:',
		port: 8080,
		hostname: '127.0.0.1',
		db: 'mongodb://localhost/personal-site'
	}
};

module.exports = config[env];
