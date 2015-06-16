import request from 'reqwest';
import appConst from '../config/constants';
import * as adminSvc from '../admin/admin-svc';


const resourceUrl = appConst.apiUrl + 'articles';


export default {
	
	getAll() {
		return request({
			url: resourceUrl,
			type: 'json',
			method: 'get',
			contentType: 'application/json'
		});
	},

	/**
	 * @param  {String} slug
	 * @return {Promise}
	 */
	getArticleBySlug(slug) {
		return request({
			url: `${resourceUrl}/slug/${slug}`,
			type: 'json',
			method: 'get',
			contentType: 'application/json'
		});
	},

	/**
	 * @param  {String} id
	 * @return {Promise}
	 */
	appreciateArticle(id) {
		return request({
			url: `${resourceUrl}/${id}/appreciate`,
			type: 'json',
			method: 'post',
			contentType: 'application/json'
		});
	},

	/**
	 * @param  {Object} articleObj
	 * @return {Promise}
	 */
	createArticle(articleObj) {
		return adminSvc.authRequest({
			url: resourceUrl,
			method: 'post',
			type: 'json',
			contentType: 'application/json',
			data: JSON.stringify(articleObj)
		});
	},

	/**
	 * @param  {Object} articleObj
	 * @return {Promise}
	 */
	updateArticle(articleObj) {
		return adminSvc.authRequest({
			url: `resourceUrl/${articleObj._id}`,
			method: 'put',
			type: 'json',
			contentType: 'application/json',
			data: JSON.stringify(articleObj)
		});
	}

};
