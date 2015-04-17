var env = process.env.NODE_ENV || 'development';

var config = {
	development: {
		hostname: 'cameron.dev',
		port: 8080,
		db: 'mongodb://localhost/local'
	},
	production: {
		port: 8080,
		hostname: 'cameronnokes.com',
		db: 'mongodb://localhost/express-production'
	}
};

module.exports = config[env];
