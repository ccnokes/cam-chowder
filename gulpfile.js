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



/**
 * for running blocks of code only in the matching environments
 * usage: if(envIs('stage', 'prod')) { doStuff(); }
 * @param {String} strings of environments to run code in
 * @return {Boolean}
 */
function envIs() {
	var args = [].slice.call(arguments);
	var isEnv = false;
	args.some(function(item) {
		if(item === ENV) {
			isEnv = true;
			return true; //break out of fn
		}
	});
	return isEnv;
}

//environment var, dev by default
//usage: gulp build --env dev|stage|prod
var validEnvs = ['dev', 'stage', 'prod'];
var ENV = (process.env.NODE_ENV || 'dev').toLowerCase();
if(validEnvs.indexOf(ENV) === -1) {
	throw new Error('Invalid environment: ' + ENV + '. ENV must equal one of these: ' + validEnvs.join(', ') + '.');
}
console.log('\nBuilding environment: ' + ENV + '\n');



var webpackConfig = require('./make-webpack-config')({
	env: ENV
});


var paths = {
	src: {
		main: 'public',
		scripts: 'public/scripts/**/*.js',
		stylesMain: 'public/styles/main.less',
		styles: 'public/styles/**/*.less',
		svgs: 'public/images/svg/*.svg'
	},

	dist: {
		scripts: 'dist/scripts/',
		styles: 'dist/styles/'
	}
};


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
	var stream = gulp.src(paths.src.main + '/scripts/**/*.js');
	stream.pipe(jshint())
		.pipe(jshint.reporter(stylish));

	return stream;
});


gulp.task('less', function() {

	var stream =
		gulp.src(paths.src.stylesMain)
		.pipe(less())
		.pipe(autoprefixer());

	if(envIs('prod')) {
		stream.pipe(minifyCSS());
	}

	return stream.pipe( gulp.dest(paths.dist.styles) );
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
		runSequence(['less']);
	});
});



var baseTasks = ['less', 'webpack'];


gulp.task('default', baseTasks.concat(['watch']));


gulp.task('build', baseTasks);
