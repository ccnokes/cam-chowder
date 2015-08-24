const secrets = require('../secrets');
const env = process.env.NODE_ENV || 'dev';

const config = {
	//this is the default
	dev: {
		scheme: 'http:',
		hostname: 'localhost',
		port: 9003,
		db: 'mongodb://localhost/personal-site-local',
		dbOpts: {
			user: 'badmin',
			pass: 'admin'
		}
	},

	stage: {
		scheme: 'http:',
		hostname: 'localhost',
		port: 8080,
		db: 'mongodb://localhost/personal-site-local',
		dbOpts: {
			user: 'badmin',
			pass: 'admin'
		}
	},

	production: {
		scheme: 'http:',
		hostname: '127.0.0.1',
		port: 8080,
		db: 'mongodb://localhost/personal-site',
		dbOpts: {
			user: secrets.dbUser,
			pass: secrets.dbPwd
		}
	}
};

module.exports = config[env];
