var webpack = require('webpack'),
	path = require('path');

function makeConfig(opts) {

	//set app entry array
	var appEntry = [];

	if(opts.env === 'dev') {
		appEntry.push('webpack/hot/only-dev-server');
	}
	appEntry.push('./public/scripts/main.js');


	var config = {

		entry: {
			app: appEntry,
			vendor: ['lodash', 'react', 'react/lib/ReactCSSTransitionGroup', 'react-router', 'reqwest', 'd3', 'react-toggle-display']
		},

		stats: {
			colors: true,
			reasons: true
		},

		output: {
			devtool: (opts.env === 'dev' ? '#eval-source-map' : ''),
			path: 'dist/scripts',
			//filenames have hashes only in prod
			filename: (opts.env === 'dev' ? '[name].bundle.js' : '[name].[hash].bundle.js'),
			publicPath: '/assets/'
		},

		plugins: [
			new webpack.DefinePlugin({
				__DEV__: (opts.env === 'dev'),
				__PROD__: (opts.env === 'production')
			}),
			new webpack.optimize.CommonsChunkPlugin('vendor.bundle.js')
		],

		module: {
			loaders: [
				{ test: /\.js.*$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            	{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
			]
		}
	};

	//add prod only plugins
	if(opts.env === 'production') {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin(),
			//write manifest file with hashed filenames
			function() {
				this.plugin('done', function(stats) {
					require('fs').writeFileSync(
						path.join(__dirname, 'dist', 'stats.json'),
						JSON.stringify(stats.toJson().assetsByChunkName, null, 4));
					});
			}
		);
	}

	return config;
}

module.exports = makeConfig;
