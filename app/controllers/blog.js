

module.exports = function(req, res, next) {
	var Controller = require('../models/controller.js');
	var blogCtrl = new Controller(req, res, next, 'Article', 'blog/blog').route();
};


