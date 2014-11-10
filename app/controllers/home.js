var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	helper = require('../services/generic-helper.js');


module.exports = function(req, res, next) {

	//limit to 5 articles
	req.query.limit = 5;
	var articlesDfd = helper.queryItems(Article, req, function(items) {
		return items;
	});

	articlesDfd.done(function(items) {
		
		res.render('home/index', {
			title: 'Cameronnokes.com',
			articles: items
		});

	})
};