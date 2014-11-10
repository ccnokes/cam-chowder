//generic helper functions

var mongoose = require('mongoose'),
	Q = require('q');

module.exports = {
	
	self: this,

	queryItems: function(collection, req, cb) {
		var dfd = Q.defer();
		var limit;

		if(req.query) {
			if(req.query.limit) {
				limit = req.query.limit;
			}
		}

		collection
		.find(req.params)
		.sort({date: 'desc'})
		.limit(limit)
		.lean() //skips creating whole object, returns only document
		.exec(function(err, items) {
			if(err) {
				dfd.reject(err);
				self.returnError(err);
			}
			if(cb) {
				cb(items);
				dfd.resolve(items);
			}
		});

		return dfd.promise;
	},

	//TODO
	queryItem: function(collection, params, cb) {
		var params = params || {};

		collection
		.findOne(params)
		.exec(function(err, item) {
			if(err) {
				self.returnError(err);
			}
			if(cb) {
				cb(item);
			}
		});
	},

	//TODO
	returnError: function(res, message, status) {
		var status = status || 400;
		res.status(400).json({ error: message });
	}

};