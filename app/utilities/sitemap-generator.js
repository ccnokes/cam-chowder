var fs = require('fs'),
	path = require('path'),
	appConstants = require('../config/app-constants'),
	articleSvc = require('../articles/article-svc'),
	js2xml = require('js2xmlparser'),
	logger = require('../config/logger'),
	ejs = require('ejs'),
	Q = require('q'),
	BufferStream = require('./buffer-stream'),
	zlib = require('zlib');


var siteMapper = exports;


//gets posts via service call, returns formatted object we need for XML conversion
function getPosts() {
	const blogUrl = 'http://cameronnokes.com/blog/';

	//get all the articles
	return articleSvc.getArticles(1, 99999, ['slug', 'modifiedDate'])
	.then(
		function ok(data) {
			return data.content.reduce(function(aggr, model) {
				var doc = model.toObject(); //convert to plain JS object from mongoose class
				aggr.push({
					loc: blogUrl + doc.slug,
					lastmod: (new Date(doc.modifiedDate).toISOString().slice(0,10)),
					changefreq: 'monthly' //hardcode this for now....
				});
				return aggr;
			}, []);
		}
	);
}


//handles XML conversion
function generateBlogPostsXML() {
	return getPosts()
	.then(
		function ok(data) {
			return data.reduce(function(strAggr, datum) {
				return strAggr += js2xml('url', datum, {
					//this removes the <xml> doc type header tag
					declaration: {
						include: false
					}
				}) + '\n';
			}, '');
		},
		function err(e) {
			logger.errorLog.error(e);
		}
	);
}


//reads in sitemap template
function readSitemap() {
	return Q.nfcall(fs.readFile, path.join(appConstants.viewsPath, 'sitemap.xml.ejs'), 'utf-8');
}


//renders whole sitemap 
siteMapper.renderSitemap = function() {	

	Q.spread([
		readSitemap(),
		generateBlogPostsXML()
	], 
	function spread(sitemapTmpl, postsXML) {
		//render template	
		var sitemap = ejs.render(sitemapTmpl, {
			blogPosts: postsXML
		});

		//create stream from buffer, gzip, and pipe to file system
		(new BufferStream(new Buffer(sitemap, 'utf-8')))
			.pipe(zlib.createGzip())
			.pipe(fs.createWriteStream(path.join(appConstants.distPath, 'sitemap.xml.gz')));
	})
	.catch(function(e) {
		logger.errorLog.error(e);
	});
};






