var request = require('reqwest'),
	appConst = require('./config/constants');

function ContactSvc() {

	var resourceUrl = appConst.apiUrl + 'contacts';

	return {
		
		postContact: function(contactObj) {
			return request({
					url: resourceUrl,
					type: 'json',
					method: 'post',
					contentType: 'application/json',
					data: JSON.stringify(contactObj)
				});
		}

	};
}

module.exports = ContactSvc();