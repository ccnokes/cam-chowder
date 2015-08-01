var fs = require('fs'),
	path = require('path'),
	appConstants = require('../config/app-constants'),
	router = require('express').Router(),
	ejs = require('ejs'),
	sitemapGenerator = require('../utilities/sitemap-generator'),
	Q = require('q'),
	errLog = require('../config/logger').errorLog;


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


viewCtrl.renderSitemap = function() {	

	Q.spread([
		readSitemap(),
		sitemapGenerator.generateBlogPostsXML()
	], function spread(sitemapTmpl, postsXML) {

		//TODO
		//create readable stream from buffer
		//pipe to gzip
		//pipe to filesystem

		var sitemap = ejs.render(sitemapTmpl, {
			blogPosts: postsXML
		});

		return Q.nfcall(fs.writeFile, path.join(appConstants.distPath, 'sitemap.xml'), sitemap);
	})
	.catch(function(e) {
		errLog.error(e);
	});
};


function readSitemap() {
	return Q.nfcall(fs.readFile, path.join(appConstants.viewsPath, 'sitemap.xml.ejs'), 'utf-8');
}