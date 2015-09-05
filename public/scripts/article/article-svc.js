import appConst from '../config/constants';
import * as adminSvc from '../admin/admin-svc';
import _ from 'lodash';
import axios from 'axios';


const resourceUrl = appConst.apiUrl + 'articles';


var getAllArticles = _.memoize(function() {
	return axios({
		url: resourceUrl,
		type: 'json',
		method: 'get',
		contentType: 'application/json'
	})
	.then(function(res) {
		return res.data;
	});
});


var getArticle = _.memoize(function(slug) {
	return axios({
		url: `${resourceUrl}/slug/${slug}`,
		type: 'json',
		method: 'get',
		contentType: 'application/json'
	})
	.then(function(res) {
		return res.data;
	});
});


export default {

	/**
	 * Get all articles using default API params. Cache results.
	 * @return {Promise}
	 */
	getAll() {
		return getAllArticles();
	},

	/**
	 * @param  {String} slug
	 * @return {Promise}
	 */
	getArticleBySlug(slug) {
		return getArticle(slug);
	},

	/**
	 * @param  {String} id
	 * @return {Promise}
	 */
	appreciateArticle(id) {
		return axios({
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
