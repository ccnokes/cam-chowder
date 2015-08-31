//dependencies
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack');
var del = require('del');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');

//plugins
var $ = require('gulp-load-plugins')();

//gulp tasks
var env = require('./gulp-tasks/env');
var paths = require('./gulp-tasks/paths');
var pkg = require('./package.json');
var streamErrNotif = require('./gulp-tasks/stream-err-notif.js');

//make sure we're building a valid env
env.checkEnv();


//dev defaults
var htmlAssets = {
	mainCSS: paths.getDistPath(paths.dist.styles) + 'main.css',
	app: paths.getDistPath(paths.dist.scripts) + 'app.bundle.js',
	vendor: paths.getDistPath(paths.dist.scripts) + 'vendor.bundle.js'
};


gulp.task('index', ['webpack', 'less'], function() {
	var version = pkg.version;

	if(env.is('production', 'stage')) {
		//get file names
		var webpackStats = require('./dist/stats.json');
		var revManifest = require('./dist/rev-manifest.json');
		var webpackManifest = fs.readFileSync('./dist/scripts/chunk-manifest.json'); //so it's a string

		//overwrite it
		htmlAssets.mainCSS = paths.getDistPath(paths.dist.styles) + revManifest['main.css'];
		htmlAssets.app = paths.getDistPath(paths.dist.scripts) + webpackStats.app;
		htmlAssets.vendor = paths.getDistPath(paths.dist.scripts) + webpackStats.vendor;
	}

	var stream = gulp.src(paths.src.mainView)
		.pipe(streamErrNotif())
		.pipe( $.ejs({
			env: env.ENV,
			version: version,
			assets: htmlAssets,
			manifest: webpackManifest
		}))
		.pipe($.if(!env.is('dev'), $.minifyHtml()))
		.pipe(gulp.dest(paths.dist.root));
});


//in development, prefer using the hot dev server script in package.json
gulp.task('webpack', ['clean'], function(done) {
	var webpackConfig = require('./make-webpack-config')({
		env: env.ENV
	});
	webpack(webpackConfig, function(err, stats) {
        if(err) {
        	console.error(err);
        	throw new gutil.PluginError('webpack', err);
        }
        else {
        	done();
        }
    });
});


gulp.task('clean', function(done) {
	del([
		paths.dist.scripts,
		paths.dist.styles,
		path.join(paths.dist.root, 'rev-manifest.json'),
		path.join(paths.dist.root, 'stats.json')
	], done);
});


gulp.task('lint', function() {
	return gulp.src(paths.src.root + '/scripts/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter(stylish));
});


gulp.task('less', function() {

	return gulp.src(paths.src.stylesMain)
		.pipe(streamErrNotif())
		.pipe($.less())
		.pipe($.autoprefixer())
		.pipe($.if(env.is('production', 'stage'), $.rev()))
		.pipe($.if(env.is('production', 'stage'), $.minifyCss()))
		//write the CSS
		.pipe( gulp.dest(paths.dist.styles) )
		//now create the manifest, if in prod
		.pipe($.if(env.is('production', 'stage'), $.rev.manifest()))
		.pipe($.if(env.is('production', 'stage'), gulp.dest(paths.dist.root)));
});


//outputs an svg that we just paste into index.ejs
//TODO make this dynamically inserted somehow
gulp.task('svg', function() {
	return gulp.src(paths.src.svgs)
		.pipe($.svgmin(function (file) {
			var prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [{
					cleanupIDs: {
						prefix: prefix + '-',
						minify: true
					}
				}]
			}
		}))
		.pipe($.svgstore({ inlineSvg: true }))
		.pipe(gulp.dest('dist/images/svg'));
});


gulp.task('watch', function() {
	$.watch(paths.src.styles, function() {
		gulp.start('less');
	});
});



var baseTasks = ['less', 'webpack'];


gulp.task('default', baseTasks.concat(['watch']));


gulp.task('build', ['index']);
