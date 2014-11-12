var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	utils = require('../utilities/utils.js'),
	contentSvc = require('../services/content-helper.js'),
	querySvc = require('../services/generic-helper.js');


module.exports = function(req, res, next) {

	//limit to 5 articles
	req.query.limit = 3;
	var articlesDfd = querySvc.queryItems(Article, req, function(items) {
		return items;
	});

	articlesDfd.done(function(items) {
		
		res.render('home/index', {
			title: contentSvc.makeTitle(),
			articles: items
		});

	})
};