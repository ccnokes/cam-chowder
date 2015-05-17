var request = require('reqwest'),
	appConst = require('../config/constants');

function ArticleSvc() {

	var resourceUrl = appConst.apiUrl + 'articles';
	var cache;

	return {
		
		getAll: function() {
			if(cache){
				//TODO
				//fake out immediately resolved promise here
				return {
					then: function(cb) {
						return cb(cache);
					}
				};
			}
			else {
				return request({
					url: resourceUrl,
					type: 'json',
					method: 'get',
					contentType: 'application/json'
				})
				.then(function(data) {
					cache = data;
					return data;
				});
			}
		},

		getArticleBySlug: function(slug) {
			return request({
				url: resourceUrl + '/' + slug + '?slug=true',
				type: 'json',
				method: 'get',
				contentType: 'application/json',

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