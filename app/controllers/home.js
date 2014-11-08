var mongoose = require('mongoose'),
	Article = mongoose.model('Article');


module.exports = function(req, res, next) {

	res.render('home/index', {
		title: 'Cameronnokes.com'
	});
};