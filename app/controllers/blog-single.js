
module.exports = function(req, res, next) {
	var Controller = require('../models/controller.js');
	var ctrl = new Controller(req, res, next, 'Article', 'blog/blog-single').route();
	
	// ctrl.queryItem({'slug': req.params.slug}, function(item) {
	// 	ctrl.render(item, {
	// 		title: item.title,
	// 		text: item.text
	// 	});
	// });
};

