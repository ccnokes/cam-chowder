var mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	utils = require('../utilities/utils.js'),
	Q = require('q'),
	mongoosePaginate = require('mongoose-paginate');


var articleSvc = exports;

articleSvc.getArticles = function(page, limit) {
	var dfd = Q.defer();
	
	Article.paginate({ status: 'active' }, page, limit, function(error, pageCount, paginatedResults, itemCount) {			
		if(error) {
			dfd.reject(error);
		}
		else {
			var returnObj = {
				page: page,
				limit: limit,
				totalPages: pageCount,
				totalItems: itemCount,
				content: paginatedResults
			};

			dfd.resolve(returnObj);
		}
	}, {
		//return in descending order (last made come first)
		sortBy: { createdDate: -1 }
	});	

	return dfd.promise;
};


articleSvc.getArticleById = function(id) {
	return Article.findById(id).exec();
};

articleSvc.getArticleBySlug = function(slug) {
	return Article.findOne({slug: slug}).exec();
};


articleSvc.createArticle = function(articleObj) {
	var post = new Article(articleObj);
	var dfd = Q.defer();

	post.save(function(err) {
		if(err) {
			dfd.reject(err.message);
		}
		else {
			dfd.resolve(post);
		}
	});
	return dfd.promise;
};


articleSvc.updateArticle = function(id, updateObj) {
	//we manually set modifiedDate here to now because Mongoose doesn't support pre update hooks
	updateObj.modifiedDate = new Date().toISOString();
	return Article.findByIdAndUpdate(id, { $set: updateObj }).exec();
};


articleSvc.appreciateArticle = function(id) {
	return Article.findById(id).exec()
	.then(
		function ok(article) {
			var appreciateCount = article.appreciates + 1;

			var updatedCount = {
				appreciates: appreciateCount
			};

			return Article.findOneAndUpdate({ _id: id }, { $set: updatedCount }).exec();			
		}
	);
};


articleSvc.batchRemoveArticles = function(idsArr) {	
	var dfds = [];
	var removedIds = [];

	//TODO track if actually deleted
	idsArr.forEach(function(id) {
		var p = Article.remove({_id: id}).exec();
		dfds.push(p.promise);
	});

	return Q.allSettled(dfds);
};


articleSvc.removeArticle = function(id) {
	return Article.remove({ _id: id }).exec();
};

