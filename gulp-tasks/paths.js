var path = require('path');


var rootDir = '.'; // <-- the '.' seems to correspond to the directory of the module that required this one

const ROOT = path.normalize( path.resolve(rootDir) );
const APP_ROOT = path.join(ROOT, 'app');
const DIST_ROOT = path.join(ROOT, 'dist');

module.exports = {

	src: {
		root: path.join(ROOT, 'public'),
		scripts: path.join(ROOT, 'public/scripts/**/*.js'),
		stylesMain: path.join(ROOT, 'public/styles/main.less'),
		styles: path.join(ROOT, 'public/styles/**/*.less'),
		svgs: path.join(ROOT, 'public/images/svg/*.svg'),
		mainView: path.join(ROOT, 'public/index.ejs')
	},

	dist: {
		root: DIST_ROOT,
		scripts: path.join(DIST_ROOT, 'scripts/'),
		styles: path.join(DIST_ROOT, 'styles/'),
		mainView: path.join(DIST_ROOT, 'index.html')
	},

	//Strips out 'dist' and everything before from a path. Because it's the root, asset URLs won't need it.
	//Makes the path suitable for use on front-end, not by node internally
	getDistPath: function(path) {
		var pathArr = path.split('/');
		return pathArr.splice( pathArr.indexOf('dist') + 1, pathArr.length - 1 ).join('/');
	}
};
