var request = require('reqwest'),
	appConst = require('../config/constants');

function ArticleSvc() {

	var resourceUrl = appConst.apiUrl + 'articles';

	return {
		
		getAll: function() {
			return request({
				url: resourceUrl,
				type: 'json',
				method: 'get',
				contentType: 'application/json'
			});
		},

		getArticleBySlug: function(slug) {
			return request({
				url: resourceUrl + '/slug/' + slug,
				type: 'json',
				method: 'get',
				contentType: 'application/json'
			});
		},

		appreciateArticle: function(id) {
			return request({
				url: resourceUrl + '/' + id + '/appreciate',
				type: 'json',
				method: 'post',
				contentType: 'application/json'
			});
		}

	};
}

module.exports = ArticleSvc();