// module.exports = function(req, res, next) {
// 	var Controller = require('../models/controller.js');
// 	var blogCtrl = new Controller(req, res, next, 'Article', 'blog/blog').route();
// };

var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	utils = require('../utilities/utils.js'),
	helper = require('../services/generic-helper.js');


module.exports = function(req, res, next) {

	//limit to 5 articles
	req.query.limit = 10;
	var articlesDfd = helper.queryItems(Article, req, function(items) {
		return items;
	});

	articlesDfd.done(function(items) {
		
		res.render('blog/blog', {
			title: 'Cameronnokes.com',
			articles: items
		});

	})
};