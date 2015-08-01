var path = require('path'),
	appConstants = require('../config/app-constants'),
	router = require('express').Router();


var viewCtrl = exports;
viewCtrl.router = router;


viewCtrl.render = function(req, res) {
	res.render( path.join(appConstants.viewsPath, 'index.ejs'), {
		version: appConstants.version,
		env: appConstants.env,
		cspHash: appConstants.cspHash
	});
};

router.route([
	'/', 
	'/blog/*', 
	'/contact',
	'/about',
	'/admin*'
]).all(viewCtrl.render);
