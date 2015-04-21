var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	utils = require('../utilities/utils.js'),
	router = require('express').Router(),
	Q = require('q');


var articleCtrl = exports;
articleCtrl.router = router;

//returns all of them in paginated list
articleCtrl.getArticles = function(req, res) {
	var params = req.params || {};

	return Article
		.find(params)
		.sort({date: 'desc'})
		.lean() //skips creating whole object, returns only document
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


articleCtrl.createArticle = function(req, res) {
	var post = new Article(req.body);
	post.save(function(err) {
		if(err) {
			res.status(500).json(err);
		}
		else {
			res.json({msg: 'Article saved.'})
		}
	})
};

router.route('/api/article').post(articleCtrl.createArticle);


articleCtrl.removeArticle = function(req, res) {
	if(req.body && req.body.ids) {
		var dfds = [];
		
		req.body.ids.forEach(function(id) {
			var p = Article.remove({_id: id}).exec();
			dfds.push(p.promise);
		});

		Q.allSettled(dfds)
		.then(function(results) {
			res.json(results);
		});
	}
	else {
		res.status(400).end();
	}
};

router.route('/api/article').delete(articleCtrl.removeArticle);

