var validators = {

	/**
	 * check if string is empty
	 * @param  {String}  str
	 * @return {Boolean}
	 */
	isEmptyString: function(str) {
		return (typeof str === 'string' && str.trim().length === 0);
	},

	//inverse of above, for convenience
	isNotEmptyString: function(str) {
		return !validators.isEmptyString(str);
	},

	/**
	 * check if email is valid
	 * adapted from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	 * @param  {String}  str
	 * @return {Boolean}
	 */
	isValidEmail: function(str) {
		return /[^\s@]+@[^\s@]+\.[^\s@]+/g.test(str);
	}

};

module.exports = validators;