var path = require('path'),
	appConstants = require('../config/app-constants'),
	router = require('express').Router(),
	appPaths = require('../../gulp-tasks/paths');


var viewCtrl = exports;
viewCtrl.router = router;


viewCtrl.render = function(req, res) {
	res.sendFile(appPaths.dist.mainView, function(err) {
		if(err) {
			res.status(404).end();
		}
	});
};

router.route([
	'/',
	'/blog/*',
	'/contact',
	'/about',
	'/admin*'
]).all(viewCtrl.render);
