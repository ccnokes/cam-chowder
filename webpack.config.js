var webpack = require('webpack');

function makeConfig(opts) {
	var config = {

		entry: {
			app: './public/scripts/main.js',
			vendor: ['react', 'react-router', 'react/lib/ReactCSSTransitionGroup', 'reqwest', 'd3', 'lodash']
		},

		stats: {
			colors: true,
			reasons: true
		},

		output: {
			devtool: (opts.env === 'dev' ? '#eval-source-map' : ''),
			path: 'dist/scripts',
			filename: 'bundle.js'
		},

		plugins: [
			new webpack.DefinePlugin({
				ENV: opts.env
			}),
			
			new webpack.optimize.CommonsChunkPlugin(
				/* chunkName= */ 'vendor',
				/* filename= */ 'vendor.bundle.js'
			)
		],

		module: {
			loaders: [
				{ test: /\.jsx?$/, loader: 'jsx-loader' }
			]
		}
	};

	if(opts.env === 'prod') {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compressor: {
					warnings: false,
					//minimize: true
				}
			}),
			new webpack.optimize.DedupePlugin()
		);
	}

	return config;
}

module.exports = makeConfig;