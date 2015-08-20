var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var less = require('gulp-less');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var rev = require('gulp-rev');
var plumber = require('gulp-plumber');
var minifyHTML = require('gulp-minify-html');
var ejs = require('gulp-ejs');

var env = require('./gulp-tasks/env');
var paths = require('./gulp-tasks/paths');
var pkg = require('./package.json');


env.checkEnv();


var webpackConfig = require('./make-webpack-config')({
	env: env.ENV
});


//dev defaults
var htmlAssets = {
	mainCSS: paths.dist.styles + 'main.css',
	app: paths.dist.scripts + 'app.bundle.js',
	vendor: paths.dist.scripts + 'vendor.bundle.js'
};


gulp.task('index', ['webpack', 'less'], function() {
	var version = pkg.version;

	if(env.is('production')) {
		//get file names
		var webpackStats = require('./dist/stats.json');
		var revManifest = require('./dist/rev-manifest.json');

		//overwrite it
		htmlAssets.mainCSS = paths.dist.styles + revManifest['main.css'];
		htmlAssets.app = paths.dist.scripts + webpackStats.app;
		htmlAssets.vendor = paths.dist.scripts + webpackStats.vendor;
	}

	var stream = gulp.src(paths.src.mainView)
		.pipe(plumber())
		.pipe( ejs({
			env: env.ENV,
			version: version,
			assets: htmlAssets
		}));

	if(!env.is('dev')) {
		stream.pipe(minifyHTML());
	}

	return stream.pipe(gulp.dest(paths.dist.root));
});


//in development, prefer using the hot dev server script in package.json
gulp.task('webpack', ['cleanScripts'], function(done) {
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


gulp.task('cleanScripts', function(done) {
	del([paths.dist.scripts], done);
});


gulp.task('lint', function() {
	var stream = gulp.src(paths.src.root + '/scripts/**/*.js');
	stream.pipe(jshint())
		.pipe(jshint.reporter(stylish));

	return stream;
});


gulp.task('less', function() {

	var stream = gulp.src(paths.src.stylesMain)
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer());

	if(env.is('production')) {
		stream.pipe(rev())
		.pipe(minifyCSS());
	}

	//write the CSS
	stream.pipe( gulp.dest(paths.dist.styles) );

	//now create the manifest, if in prod
	if(env.is('production')) {
		stream.pipe(rev.manifest())
		.pipe( gulp.dest(paths.dist.root) );
	}

	return stream;
});


//outputs an svg that we just paste into index.ejs
//TODO make this dynamically inserted somehow
gulp.task('svg', function() {
	return gulp.src(paths.src.svgs)
		.pipe(svgmin(function (file) {
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
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(gulp.dest('dist/images/svg'));
});


gulp.task('watch', function() {
	watch(paths.src.styles, function() {
		//runSequence(['less']);
		gulp.start('less');
	});
});



var baseTasks = ['less', 'webpack'];


gulp.task('default', baseTasks.concat(['watch']));


gulp.task('build', baseTasks);
