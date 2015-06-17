import request from 'reqwest';
import appConst from '../config/constants';
import * as adminSvc from '../admin/admin-svc';

const resourceUrl = appConst.apiUrl + 'contacts';

export default {
		
	postContact(contactObj) {
		return request({
				url: resourceUrl,
				type: 'json',
				method: 'post',
				contentType: 'application/json',
				data: JSON.stringify(contactObj)
			});
	},

	getContacts() {
		return adminSvc.authRequest({
				url: resourceUrl,
				method: 'get',
				contentType: 'application/json'
			});
	}

};
