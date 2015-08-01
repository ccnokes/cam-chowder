var	winston = require('winston'),
	appConstants = require('./app-constants'),
	mkdirp = require('mkdirp');

var logger = exports;

mkdirp.sync(appConstants.logsPath);

//error log
logger.errorLog = new (winston.Logger)({
	transports: [
		new winston.transports.File({
			name: 'errorLog',
			level: 'error',
			filename: appConstants.logsPath + '/error.log',
			handleExceptions: true,
			json: true,
			maxsize: 5242880, //5MB
			maxFiles: 5,
			colorize: false
		}),
		new winston.transports.Console({
			name: 'errorConsole',
			level: 'error',
			handleExceptions: true,
			json: true,
			colorize: true
		})
	]
});

//misc log
logger.miscLog = new (winston.Logger)({
	transports: [
		new winston.transports.File({
			name: 'activityLog',
			level: 'info',
			filename: appConstants.logsPath + '/misc.log',
			handleExceptions: false,
			json: true,
			maxsize: 5242880, //5MB
			maxFiles: 5,
			colorize: false
		})
	]
});