module.exports = {

	entry: './public/scripts/main.js',

	stats: {
		colors: true,
		reasons: true
	},

	output: {
		devtool: 'inline-source-map',
		path: 'dist/scripts',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: 'jsx-loader' }
		]
	}

};