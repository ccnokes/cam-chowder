var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	utils = require('../utilities/utils.js'),
	router = require('express').Router(),
	Q = require('q'),
	_ = require('lodash'),
	mongoosePaginate = require('mongoose-paginate'),
	articleSvc = require('./article-svc');


var articleCtrl = exports;
articleCtrl.router = router;


articleCtrl.getArticles = function(req, res) {	
	articleSvc.getArticles(req.query.page, req.query.limit)
	.then(
		function ok(data) {
			res.json(data);
		},
		function err(e) {
			res.status(404).end();
		}
	);
};
router.route('/api/articles').get(articleCtrl.getArticles);


articleCtrl.getArticle = function(req, res) {
	return articleSvc.getArticleById(req.params.id)
		.then(
			function ok(article) {
				if(article) {
					res.json(article);
				}
				else {
					res.status(404).end();
				}
			}, 
			function err(e) {
				res.status(404).end();
			}
		);
};
router.route('/api/articles/:id').get(articleCtrl.getArticle);


articleCtrl.getArticleBySlug = function(req, res) {
	return articleSvc.getArticleBySlug(req.params.slug)
		.then(
		function ok(article) {
			if(article) {
				res.json(article);
			}
			else {
				res.status(404).end();
			}
		}, 
		function err(e) {
			res.status(404).end();
		}
	);
};
router.route('/api/articles/slug/:slug').get(articleCtrl.getArticleBySlug);


articleCtrl.createArticle = function(req, res) {
	articleSvc.createArticle(req.body)
	.then(
		function ok(article) {
			article.resourceUri = '/api/articles/' + article._id;
			res.status(201).json(article);
		},
		function err(e) {
			res.status(400).json({message: e});
		}
	)
};
router.route('/api/articles').post(articleCtrl.createArticle);


articleCtrl.updateArticle = function(req, res) {
	articleSvc.updateArticle(req.params.id, req.body)
	.then(
		function ok(data) {
			res.json(data);
		},
		function err(e) {
			res.status(404).end();
		}
	);
};
router.route('/api/articles/:id').put(articleCtrl.updateArticle);


articleCtrl.appreciateArticle = function(req, res) {	
	articleSvc.appreciateArticle(req.params.id)
	.then(
		function ok(article) {
			res.json({message: 'Article updated.', _id: article._id, appreciateCount: article.appreciates});
		},
		function err(e) {
			res.status(404).end();
		}
	);
};
router.route('/api/articles/:id/appreciate').post(articleCtrl.appreciateArticle);


articleCtrl.batchRemoveArticles = function(req, res) {
	if(req.body && _.isArray(req.body.ids) && req.body.ids.length > 0) {
		articleSvc.batchRemoveArticles(req.body.ids)
		.then(
			function ok(results) {
				res.json({ message: 'Article(s) removed.' });
			},
			function err() {
				res.status(404).end();
			}
		);
	}
	else {
		res.status(404).end();
	}
};
router.route('/api/articles').delete(articleCtrl.batchRemoveArticles);


articleCtrl.removeArticle = function(req, res) {
	articleSvc.removeArticle(req.params.id)
	.then(
		function ok(data) {
			console.log(data);
			res.json({message: 'Article(s) removed.'});
		},
		function err(e) {
			res.status(404).end();
		}
	);
};
router.route('/api/articles/:id').delete(articleCtrl.removeArticle);

