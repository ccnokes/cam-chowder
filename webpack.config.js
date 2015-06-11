var webpack = require('webpack');

function makeConfig(opts) {
	var config = {

		entry: {
			app: ['./public/scripts/main.js'],
			vendor: ['lodash', 'react', 'react/lib/ReactCSSTransitionGroup', 'react-router', 'reqwest', 'd3']
		},

		stats: {
			colors: true,
			reasons: true
		},

		output: {
			devtool: (opts.env === 'dev' ? '#eval-source-map' : ''),
			path: 'dist/scripts',
			filename: '[name].bundle.js'
		},

		plugins: [
			new webpack.DefinePlugin({
				ENV: opts.env
			}),
			new webpack.optimize.CommonsChunkPlugin('vendor.bundle.js')
		],

		module: {
			loaders: [
				{ test: /\.jsx?$/, loader: 'jsx-loader' }
			]
		}
	};

	if(opts.env === 'prod') {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin()
		);
	}

	return config;
}

module.exports = makeConfig;