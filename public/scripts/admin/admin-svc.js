var request = require('reqwest'),
	appConst = require('../config/constants');

function AdminSvc() {

	var resourceUrl = appConst.apiUrl;

	return {
		
		authenticate: function(userObj) {
			console.log(userObj);

			return request({
				url: resourceUrl + 'authenticate',
				type: 'json',
				method: 'post',
				contentType: 'application/json',
				headers: {
					Authorization: 'Basic ' + btoa(userObj.username + ':' + userObj.password)
				}
			});
		}

	};
}

module.exports = AdminSvc();