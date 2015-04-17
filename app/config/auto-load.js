var fs = require('fs'),
	path = require('path'),
	_ = require('lodash'),
	appConstants = require('./app-constants');



var fixPath = function(dirPath) {
	return path.resolve(appConstants.appPath, dirPath);
};

/**
 * auto load all JS files in a directory by requiring them
 * @param  {String|Array} dirPath - all paths are relative to app folder
 * @param {Function} optional callback to be run on each required file
 * @return {Array} all of the loaded files
 */
function autoLoad(directories, cb) {
	var dirs = [];
	var loadedFiles = [];
	
	//set dirs array
	if(_.isString(directories)) {
		dirs.push(directories);
	}
	else {
		dirs = directories;
	}

	//fix path
	dirs = dirs.map( (item) => {
		return fixPath(item);
	});

	var load = function(dirPath) {
		fs.readdirSync(dirPath).forEach( (file) => {
			if(file.indexOf('.js') !== -1) {
				var filepath = path.join(dirPath, file);
				loadedFiles.push(filepath);
				
				//capture export in var
				var mod = require(filepath);
				if(cb) {
					cb(filepath, mod);
				}
			}
		});
	};

	dirs.forEach(load);

	return loadedFiles;
}

module.exports = autoLoad;