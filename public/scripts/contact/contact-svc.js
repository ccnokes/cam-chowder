import axios from 'axios';
import appConst from '../config/constants';
import * as adminSvc from '../admin/admin-svc';

const resourceUrl = appConst.apiUrl + 'contacts';

export default {

	postContact(contactObj) {
		return axios.post(resourceUrl, contactObj);
	},

	getContacts() {
		return adminSvc.authRequest({
			url: resourceUrl,
			method: 'get'
		})
		.then(function(res) {
			return res.data;
		});
	}

};
