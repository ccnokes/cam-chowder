//this is more for convenience so that webpack-dev-server can be called straight from the command line
//see package.json scripts block
module.exports = require('./make-webpack-config')({
	env: 'dev'
});