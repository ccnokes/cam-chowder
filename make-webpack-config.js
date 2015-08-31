var webpack = require('webpack'),
	path = require('path'),
	ManifestPlugin = require('webpack-manifest-plugin'),
	ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');


//write manifest file with hashed filenames
function writeManifestPlugin() {
	this.plugin('done', function(stats) {
		require('fs').writeFileSync(
			path.join(__dirname, 'dist', 'stats.json'),
			JSON.stringify(stats.toJson().assetsByChunkName, null, 4));
		});
}


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
			filename: (opts.env === 'dev' ? '[name].bundle.js' : '[name].[chunkhash].bundle.js'),
			publicPath: '/assets/'
		},

		plugins: [
			new webpack.DefinePlugin({
				__DEV__: (opts.env === 'dev'),
				__STAGE__: (opts.env === 'stage'),
				__PROD__: (opts.env === 'production')
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				filename: (opts.env === 'dev' ? '[name].bundle.js' : '[name].[chunkhash].bundle.js'),
				minChunks: Infinity
			})
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
			new webpack.optimize.DedupePlugin()
		);
	}

	if(opts.env === 'stage' || opts.env === 'production') {
		config.plugins.push(
			//new ManifestPlugin(),
			new ChunkManifestPlugin({
				filename: 'chunk-manifest.json',
				manifestVariable: 'webpackManifest'
			}),
			writeManifestPlugin,
			new webpack.optimize.OccurenceOrderPlugin()
		);
	}

	return config;
}

module.exports = makeConfig;
