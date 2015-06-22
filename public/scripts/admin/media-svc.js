import request from 'reqwest';
import appConst from '../config/constants';
import * as adminSvc from '../admin/admin-svc';

const resourceUrl = appConst.apiUrl + 'media';

export default {

	upload(formData) {
		let authHeader = adminSvc.makeAuthHeader( adminSvc.getToken() );

		let fd = new FormData();
		fd.append('test', formData);

		let xhr = new XMLHttpRequest();
		xhr.upload.addEventListener('progress', function(e) {
			if (e.lengthComputable) {
				var percentComplete = (e.loaded / e.total) * 100;
				console.log(percentComplete + '% uploaded');
			}
		});

		xhr.open('POST', resourceUrl, true);
		xhr.setRequestHeader('Authorization', 'Basic ' + authHeader);

		//console.log(formData, fd, xhr);

		xhr.send(fd);

		//return some promise like object here
	},

	getUploads() {
		return adminSvc.authRequest({
			url: resourceUrl,
			type: 'json',
			method: 'get'
		});
	}

};