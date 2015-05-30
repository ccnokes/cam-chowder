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
		hostname: 'cameronnokes.com',
		db: 'mongodb://localhost/express-production'
	}
};

module.exports = config[env];
