module.exports = function(app) {

	var path = require('path'),
		express = require('express')
		router = express.Router();


	var getCtrl = function(str) {
		var ctrlpath = app.get('controllers'),
			uri = path.join(ctrlpath, str +'.js');	

		return require(uri);
	};


	//app.get('/', getCtrl('home').index );

	//blog
	// app.get('/blog', getCtrl('blog') );
	// app.get('/blog/:slug', getCtrl('blog-single') );

	// app.get('/api/blog', getCtrl('blog') );
	// app.get('/api/blog/:slug', getCtrl('blog-single') );	

	// app.post('/api/blog/insert', getCtrl('blog') );

	// app.put('/api/blog/update/:id', getCtrl('blog') );

	// app.delete('/api/blog/remove/:id', getCtrl('blog') );

	//app.all('', getCtrl('blog'));



	router.route('/').get( getCtrl('home') );

	router.route('/api/articles')
		.all( getCtrl('blog') );

	router.route('/api/articles/:slug')
		.get( getCtrl('blog-single') );


	app.use(router);

};