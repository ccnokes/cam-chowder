const secrets = require('../secrets');
const MAX_CHARS = 160;

var twilio = require('twilio'),
	client = new twilio.RestClient(secrets.twilioAPIKey, secrets.twilioSecret),
	logger = require('../config/logger');


var notifier = exports;


notifier.sendContactNotification = function(contact) {
	var body = 'New lead: ';
	body += contact.name + ' ';
	body += contact.email + ' ';

	//add message to body as space allows
	if(body.length < MAX_CHARS) {
		var remainingChars = MAX_CHARS - body.length;
		body += contact.message.split('').splice(0, remainingChars).join('');
	}

	client.sms.messages.create({
		to: secrets.myPhone,
		from: secrets.twilioPhone,
		body: body
	}, function(error, message) {
		if (error) {
			logger.errorLog(error);
		}
	});
};

