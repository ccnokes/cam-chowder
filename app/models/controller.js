var mongoose = require('mongoose'),
	_ = require('underscore'),
	async = require('async');


function Controller(req, res, next, collection, viewFile) {
	
	if( !(this instanceof Controller) ) {
		return new Controller(req, res, collection, viewFile);
	}

	this.collection = mongoose.model(collection);
	this.viewFile = viewFile;

	this.req = req;
	this.res = res;
	this.next = next;
}

Controller.prototype = {

	//automatically routes request to right method
	route: function() {

		//API routes
		if(this.req.url.indexOf('api') !== -1) {
			
			switch(this.req.method) {
				
				case 'GET':
					this.getAPI();
					break;
				
				case 'POST':
					this.save();
					break;
				
				case 'PUT':
					this.update();
					break;

				case 'DELETE':
					this.removeById();
					break;
				
				default:
					this.getAPI();
			}
		}
		//TODO remove this
		else {
			this.get();
		}

		return this;
	},


	//some generic methods

	//TODO: remove this
	get: function() {
		var _this = this;
		this.queryItems({}, function(items) {
			_this.render(items);
		});
	},

	getAPI: function() {
		var self = this;
		
		console.error(this.req.params);

		if( !_.isEmpty(this.req.params) ) {
			this.queryItem(this.req.params, function(item) {
				self.res.json(item);
			});
		}
		else {
			this.queryItems(this.req.query, function(items) {
				self.res.json(items);
			});
		}
	},

	update: function() {
		var self = this,
			body = this.req.body;
		
		//exit out if no id provided
		if(!body._id) {
			this.returnError('No _id property provided.', 400);
			return false;
		}

		async.waterfall([
			//first, find it by id, then pass to next task
			function(callback) {
				self.collection.findById(body._id).exec(function(err, item) {
					if(item) {
						callback(null, item);
					} else {
						callback(err);
					}
				});
			},
			function(item, callback) {
				//merge two together models together
				item = _.extend(item, body);
				//save to DB, and call next task
				item.save(function(err, item) {
					callback(null, item);
				});
			}
		], function(err, results) {
			if(!err) {
				//return json response
				self.res.json(results);
			}
		});
	},

	save: function() {
		var self = this;
		var item = new this.collection(this.req.body);
		item.save(function(err, data) {
			self.res.json(data);
		});
	},

	//find by id and delete. returns deleted object
	removeById: function() {
		var self = this,
			body = this.req.body;
		
		if(!body._id) {
			this.returnError('no _id provided', 400);
		}

		this.collection.findByIdAndRemove(body._id, {}, function(err, deletedItem) {
			if(!err) {
				self.res.json({ deleted: true, deletedItem: deletedItem});
			} else {
				self.returnError(err);
			}
		});
	},


	//lower level methods

	queryItems: function(params, cb) {
		var self = this,
			params = params || {};

		this.collection
		.find(params)
		.sort({date: 'desc'})
		.exec(function(err, items) {
			if(err) {
				//throw new Error(err);
				self.returnError(err);
			}
			if(cb) {
				cb(items);
			}
		});

		return this;
	},

	queryItem: function(params, cb) {
		var _this = this, 
			params = params || {};

		this.collection
		.findOne(params)
		.exec(function(err, item) {
			if(err) {
				//throw new Error(err);
				self.returnError(err);
			}
			if(cb) {
				cb(item);
			}
		});

		return this;
	},

	render: function(items, viewObj) {
		var viewObj = viewObj || {
			collection: items
		};
		
		var _this = this;

		this.res.render(_this.viewFile, viewObj);
	},

	returnError: function(message, status) {
		//var err = new Error(message);
		var status = status || 400;
		this.res.status(400).json({ error: message });
	}
};


module.exports = Controller;