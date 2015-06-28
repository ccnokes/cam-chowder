var webpack = require('webpack');

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
			vendor: ['lodash', 'react', 'react/lib/ReactCSSTransitionGroup', 'react-router', 'reqwest', 'd3']
		},

		stats: {
			colors: true,
			reasons: true
		},

		output: {
			devtool: (opts.env === 'dev' ? '#eval-source-map' : ''),
			path: 'dist/scripts',
			filename: '[name].bundle.js',
			publicPath: '/assets/'
		},

		plugins: [
			new webpack.DefinePlugin({
				__DEV__: (opts.env === 'dev'),
				__PROD__: (opts.env === 'prod')
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
	if(opts.env === 'prod') {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin()
		);
	}

	return config;
}

module.exports = makeConfig;