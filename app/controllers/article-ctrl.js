var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	utils = require('../utilities/utils.js'),
	router = require('express').Router(),
	Q = require('q'),
	mongoosePaginate = require('mongoose-paginate');


var articleCtrl = exports;
articleCtrl.router = router;

//returns all of them in paginated list
articleCtrl.getArticles = function(req, res) {
	//Article.plugin(mongoosePaginate);
	Article.paginate({}, req.query.page, req.query.limit, function(error, pageCount, paginatedResults, itemCount) {
		if (error) {
			console.error(error);
		} 
		else {
			var returnObj = {
				page: req.query.page,
				limit: req.query.page,
				totalPages: pageCount,
				totalItems: itemCount,
				content: paginatedResults
			};

			res.json(returnObj);
		}
	}, {
		//return in descending order (last made come first)
		sortBy: { date: -1 }
	});
};
router.route('/api/article').get(articleCtrl.getArticles);


articleCtrl.getArticle = function(req, res) {
	Article.findById(req.params.id).exec()
	.then(function(article) {
		res.json(article);
	}, function(e) {
		console.error(e);
		res.status(404).end();
	});
};
router.route('/api/article/:id').get(articleCtrl.getArticle);


articleCtrl.createArticle = function(req, res) {
	var post = new Article(req.body);
	post.save(function(err) {
		if(err) {
			res.status(404).json(err);
		}
		else {
			post._doc.resourceUri = '/api/article/' + post._id;
			res.status(201).json({
				message: 'Article created.', 
				data: post
			});
		}
	});
};
router.route('/api/article').post(articleCtrl.createArticle);


articleCtrl.updateArticle = function(req, res) {
	var id = req.params.id;

	//we manually set modifiedDate here to now because Mongoose doesn't support pre update hooks
	req.body.modifiedDate = new Date().toISOString();

	Article.findByIdAndUpdate(id, { $set: req.body }, function(err, data) {
		if(err) {
			console.error(err);
			res.status(404).end();
		}
		res.json(data);	
	});
};
router.route('/api/article/:id').put(articleCtrl.updateArticle);


articleCtrl.appreciateArticle = function(req, res) {
	var id = req.params.id;

	Article.findById(id, function(err, data) {
		if(err) {
			console.error(err);
			res.status(404).end();
		}
		var appreciateCount = data.appreciates + 1;

		var updatedCount = {
			appreciates: appreciateCount
		};

		Article.findOneAndUpdate({ _id: id }, { $set: updatedCount }, function(err, updatedDoc) {
			if(err) {
				console.error(err);
				res.status(404).end();
			}
			else {
				res.json({message: 'Article updated.', appreciateCount: appreciateCount});
			}
		});
	});
};
router.route('/api/article/:id/appreciate').post(articleCtrl.appreciateArticle);


articleCtrl.batchRemoveArticles = function(req, res) {
	if(req.body && _.isArray(req.body.ids)) {
		var dfds = [];
		
		//TODO track if actually deleted
		req.body.ids.forEach(function(id) {
			var p = Article.remove({_id: id}).exec();
			dfds.push(p.promise);
		});

		//when all delete ops are complete, send response
		Q.allSettled(dfds)
		.then(function(results) {
			//TODO return array of deleted articles
			res.json(results);
		});
	}
	else {
		res.status(404).end();
	}
};
router.route('/api/article').delete(articleCtrl.batchRemoveArticles);


articleCtrl.removeArticle = function(req, res) {
	Article.remove({ _id: req.params.id }).exec()
	.then(function(removeCount) {
		if(removeCount > 0) {
			res.json({message: 'Article(s) removed.', removeCount: removeCount});
		}
		else {
			res.status(404).end();	
		}
	}, 
	function(e) {
		res.status(404).end();
	});
};
router.route('/api/article/:id').delete(articleCtrl.removeArticle);
