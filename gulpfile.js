var gulp = require('gulp');
var webpack = require("webpack");
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');



var webpackConfig = require('./webpack.config');


var paths = {
	src: {
		main: 'public',
		scripts: 'public/scripts/**/*.js'
	},
	
	dist: {
		scripts: 'dist/scripts/**/*'
	}
};


gulp.task('webpack', function(done) {
	webpack(webpackConfig, function(err, stats) {
        if(err) {
        	console.error(err);
        	throw new gutil.PluginError("webpack", err);	
        }
        else {
        	done();
        }
    });
});


gulp.task('cleanScripts', function(done) {
	del([dist.scripts], done);
});


gulp.task('lint', function() {
	//exclude manually imported ui-bootstrap modules
	var stream = gulp.src(paths.src.main + '/scripts/**/*.js');
	stream.pipe(jshint())
		.pipe(jshint.reporter(stylish));

	return stream;
});




gulp.task('watch', function() {
	watch(paths.src.scripts, function() {
		runSequence(['webpack']);
	});
});