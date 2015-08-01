var articleSvc = require('../articles/article-svc'),
	js2xml = require('js2xmlparser'),
	logger = require('../config/logger');

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
					lastMod: (new Date(doc.modifiedDate).toISOString().slice(0,10)),
					changefreq: 'monthly' //hardcode this for now....
				});
				return aggr;
			}, []);
		}
	);
}


//handles XML conversion
siteMapper.generateBlogPostsXML = () => {
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
};

