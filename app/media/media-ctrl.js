var path = require('path'),
	fs = require('fs'),
	mkdirp = require('mkdirp'),
	router = require('express').Router(),
	authCtrl = require('../auth/auth-ctrl'),
	multiparty = require('multiparty'),
	glob = require('glob');

const resourceUri = '/api/media';
const appConstants = require('../config/app-constants');

var mediaCtrl = exports; 
mediaCtrl.router = router;




//protected
mediaCtrl.handleUpload = function(req, res) {
	var uploadUri;

	var form = new multiparty.Form({
		uploadDir: appConstants.uploadsPath
	});

	form.on('error', function(err) {
		console.log('Error parsing form: ' + err.stack);
		res.status(400).end();
	});

	form.on('part', function(part) {
		if(part.filename) {
			//generate dir name
			var d = new Date();
			var dir = '' + d.getFullYear() + '-' + d.getMonth() + 1;

			//make the directory
			mkdirp(path.join(appConstants.uploadsPath, dir), function() {
				uploadUri = path.join('uploads', dir, part.filename);
				
				//direct filestream into it
				part.pipe(fs.createWriteStream( path.join(appConstants.uploadsPath, dir, part.filename) ));
			});

			part.on('error', function(err) {
				console.error(err);
				res.status(500).end();
			});
		}
	});

	// Close emitted after form parsed 
	form.on('close', function() {
		res.json({fileUrl: uploadUri, message: 'Success!!!'});
	});
	
	form.parse(req);
};
router.route(resourceUri).post(authCtrl.isAuthenticated, mediaCtrl.handleUpload);


//protected
mediaCtrl.getUploads = function(req, res) {
	glob( appConstants.uploadsPath + '/**/*', {nodir: true}, function(err, files) {
		
		if(err) {
			res.status(500).end();
		}

		var fileArr = files.map(function(file) {
			var splitArr = file.split('/');
			
			var filename = splitArr.slice(splitArr.length - 1)[0];
			var uploadsIndex = splitArr.indexOf('uploads');
			var uri = splitArr.slice(uploadsIndex, splitArr.length).join('/');
			var filenameNoExt = filename.replace(/\.\w+/g, '');

			return {
				uri: uri,
				filename: filename,
				md: '![' + filenameNoExt + '](' + uri + ')' //example markdown syntax
			};
		});

		res.json(fileArr);

	});
};
router.route(resourceUri).get(authCtrl.isAuthenticated, mediaCtrl.getUploads);

