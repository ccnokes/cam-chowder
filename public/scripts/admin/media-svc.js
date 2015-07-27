import request from 'reqwest';
import appConst from '../config/constants';
import * as adminSvc from '../admin/admin-svc';

const resourceUrl = appConst.apiUrl + 'media';

export default {

	upload(formData, cb) {
		let authHeader = adminSvc.makeAuthHeader( adminSvc.getToken() );

		let fd = new FormData();
		fd.append('test', formData);

		let xhr = new XMLHttpRequest();
		// xhr.upload.addEventListener('progress', function(e) {
		// 	if (e.lengthComputable) {
		// 		var percentComplete = (e.loaded / e.total) * 100;
		// 		console.log(percentComplete + '% uploaded');
		// 	}
		// });
	
		xhr.addEventListener('readystatechange', function(e) {
		 	if(xhr.readyState === 4 && xhr.status === 200) {
		 		cb(null, JSON.parse(xhr.response));
		 	}
		 	else if(xhr.readyState === 4 && xhr.status !== 200) {
		 		cb(new Error('upload failed'), null);
		 	}
		});

		xhr.open('POST', resourceUrl, true);
		xhr.setRequestHeader('Authorization', 'Basic ' + authHeader);


		xhr.send(fd);
	},

	getUploads() {
		return adminSvc.authRequest({
			url: resourceUrl,
			contentType: 'application/json',
			method: 'get'
		});
	},

	removeUpload(uri) {
		return adminSvc.authRequest({
			url: `${resourceUrl}/${encodeURIComponent(uri)}`,
			contentType: 'application/json',
			method: 'delete'
		});
	}

};