//content helpers for templates

var _ = require('lodash'),
	app = require('../../config/app-boot');

module.exports = {
	
	makeTitle: function(str) {
		if(_.isString(str)) {
			str = str.trim(); //remove trailing whitespaces
			var delimiter = ' | ';
			return app.get('siteTitle') + delimiter + str;
		} 
		else {
			return app.get('siteTitle');	
		}
	}

};