var path = require('path'),
	_ = require('lodash'),
	appConstants = require('./app-constants'),
	glob = require('glob');


//make it relative to app folder
var fixPath = function(dirPath) {
	return path.resolve(appConstants.appPath, dirPath);
};

/**
 * auto load all JS files in a directory by requiring them
 * @param  {String|Array} dirPath - all paths are relative to app folder
 * @param {Function} optional callback to be run on each required file
 * @return {Array} all of the loaded files
 */
function autoLoad(_patterns, cb) {
	var patterns = [];
	
	//set dirs array
	if(_.isString(_patterns)) {
		patterns.push(_patterns);
	}
	else {
		patterns = _patterns;
	}

	//fix paths
	var files = patterns.map( (item) => {
		var dir = fixPath(item);
		return glob.sync(dir);
	});
	//glob.sync returns an array, so we flatten it out
	files = _.flatten(files);

	var load = function(file) {
		//capture export in var
		var mod = require(file);
		if(cb) {
			cb(mod, file);
		}
	};

	files.forEach(load);
	
	return files;
}

module.exports = autoLoad;