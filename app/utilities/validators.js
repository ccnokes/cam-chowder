var _ = require('lodash');

module.exports = {

	//validates email address
	checkEmail: function(email) {
		if(!_.isEmpty(email)) {
			//this regex copied from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
			//and tested
			var re = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
			return re.test(email);
		}
		else {
			return false;
		}
	},

	//for when you have to pass in a function and passing in `!_.isEmpty` seems weird
	isNotEmpty: function(val) {
		return !_.isEmpty(val);
	}
	
};