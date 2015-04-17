var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	utils = require('../utilities/utils.js'),
	router = require('express').Router(),
	app = require('../config/app-boot');


var articleCtrl = exports;

//returns all of them in paginated list
articleCtrl.getArticles = function(req, res) {
	var params = req.params || {};

	return Article
		.find(params)
		.sort({date: 'desc'})
		//.limit(limit)
		//.lean() //skips creating whole object, returns only document
		.exec()
		.then(
			function ok(data) {
				res.json(data);
			}, function err(e) {
				console.error('err: ', e);
			}
		);
};

router.route('/api/article').get(articleCtrl.getArticles);



app.use(router);