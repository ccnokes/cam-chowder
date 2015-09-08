import appConst from '../config/constants';
import * as adminSvc from '../admin/admin-svc';
import _ from 'lodash';
import axios from 'axios';


const resourceUrl = appConst.apiUrl + 'articles';


//wrap the call in a caching layer
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


//wrap the call in a caching layer
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


//make sure only 3 articles are cached
function manageArticlesCache(slug) {
	if(getArticle.cache) {
		let cacheArr = Object.keys(getArticle.cache);
		if(cacheArr.length >= 3) {
			//delete oldest entry
			let oldestEntry = cacheArr.sort().shift();
			delete getArticle.cache[oldestEntry];
		}
	}
}


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
		setTimeout(manageArticlesCache.bind(slug), 1); //do this async
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
			data: articleObj
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
