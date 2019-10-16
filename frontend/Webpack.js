
// Webpack - module bundler.
// v2.2.1

================================================================================
Install & run ================================================================={
	
	$ npm install -g webpack
	
	// Then create webpack.config.js in project root
	
	// Run:
		$ webpack
			// using ./webpack.config.js config
		$ somevar=val ... webpack
			// somevar will be available in webpack.config.js as
			// `process.env.somevar`
		$ webpack
			--config file  // using specified config
			--profile --display-modules --display-reasons  // print details
			-w  // enable autoWatch
			-d  // shortcut for --debug --devtool eval-cheap-module-source-map
				// --output-pathinfo
			-p  // shortcut for --optimize-minimize
				// --define process.env.NODE_ENV="production"
}
================================================================================
Config ========================================================================{
	
	// /webpack.config.js:
		var webpack = require('webpack');
		var glob = require('glob');
		
		const ENV = process.env.NODE_ENV || 'dev';
		
		module.exports = {
			context: __dirname + '/src',
				// base path for resolving entry options
			entry: {
				module1: './module1',
					// will be "src/module1.js"
				module2: ['module2', './module3'],
					// only last will be exported
				module3: glob.sync('/tests/*.spec.js', {cwd: __dirname + '/src'})
					// select by glob
			},
			output: {
				path: __dirname + '/build',
				filename: '[name].js',
					// also available [hash], [chunkhash]
					// will be "build/module1.js", "build/module2.js"
				library: '[name]',
					// will be "module1", "module2"
				chunkFilename: '[id].js',
					// also available [name], [hash], [chunkhash]
				publicPath: '/build/'
					// public URL address of the output dir
			},
			
			externals: {
				'./libs/jquery': 'jQuery'
					// will not bunble library, use "jQuery" global
					// variable instead
			},
			
			module: {
				rules: [{
					test: /\.js$/,
						// filter by name|extension
					include: [__dirname + '/src'],
					exclude: [__dirname + '/node_modules'],
						// filter by path
					loader: 'autopolyfiller-loader',
				}, {
					// by default all imports will be interpreted as js
					// instead, use loaders to process imports of another files
					test: /\.css$/,
					use: ['style-loader', 'css-loader', 'autoprefixer-loader']
						// now accessible as `import './style.css'`
						// or `require('./style.css')`
				}]
				// order - from bottom to top
			},
			
			plugins: [
				new webpack.optimize.UglifyJsPlugin({})
			],
			
			resolve: {
				alias: {
					some: 'lib/somelib'
					// so library can be imported by `import 'some'`
				},
				modules: ['node_modules'],
				extensions: ['.js', '.json']
			},
			resolveLoader: {
				modules: ['web_loaders', 'web_modules', 'node_loaders',
					'node_modules'],
				extensions: ['.webpack-loader.js', '.web-loader.js',
					'.loader.js', '.js'],
				packageMains: ['webpackLoader', 'webLoader', 'loader', 'main'],
				moduleExtensions: []
			},
			
			watch: ENV == 'dev',
			watchOptions: {
				aggregateTimeout: 300
					// ms
			},
			
			devtool: 'source-map',
				// or cheap-module-source-map, inline-module-source-map, etc
				// or null
		};
}
================================================================================
Loaders ======================================================================={
	
	// Setup:
		rules: [{
			test: /\.js$/,
			loader: 'autopolyfiller',
		}, {
			test: /\.js$/,
			loader: 'babel',
			options: {
				presets: ['es2015', 'react']
			}
		}]
		// order - from bottom to top
		
		// It's same as:
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'autopolyfiller',
			}, {
				loader: 'babel'
				options: {
					presets: ['es2015', 'react']
				}
			}]
			// order - from bottom to top
		}]
		
		// And same as:
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'autopolyfiller'
			}, {
				loader: 'babel?presets[]=es2015,presets[]=react',
			}
			// order - from bottom to top
		}]
	
	
	// babel 6
		$ npm install --save-dev \
			babel-core babel-preset-es2015 babel-polyfill \
			babel-loader \
			babel-plugin-transform-es2015-modules-commonjs \
			babel-plugin-transform-es2015-modules-umd \
		
		'babel?presets=es2015'
	
	// autopolyfiller
		$ npm install --save-dev autopolyfiller-loader
		
		'autopolyfiller?browsers[]=last 2 versions,browsers[]=ie >= 9'
	
	// jshint
		$ npm install --save-dev jshint jshint-loader
		
		'jshint?esversion=6'
	
	// imports
		// wrap old library and add imports
		$ npm install --save-dev imports-loader
		
		'imports?var1,var2'
	
	// exports
		// wrap old libs and add exports
		$ npm install --save-dev exports-loader
		
		'exports?var=>"value"'
	
	// styles
		$ npm install --save-dev style-loader css-loader autoprefixer-loader \
			stylus-loader less-loader
		
		['style', 'css']
		['style', 'css', 'autoprefixer']
		['style', 'css', 'autoprefixer', 'stylus?resolve url']
		['style', 'css', 'autoprefixer', 'less']  // resolves url by default
		
		// to save module's css as separate file:
			// modify css loader:
			rules: [{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style',
					use: ['css', 'autoprefixer']
				})
			}]
			// and add plugin:
			plugins: [
				new ExtractTextPlugin('[name].css')
			]
	
	// files
		$ npm install --save-dev file-loader
		
		'file?name=[hash].[ext]'  // default
		'file?name=[path][name].[ext]'  // to preserve origin path and name
			// also available [hash], [hash:N] (where N - len limit)
	
	// dataurl
		// wrapper for file-loader
		$ npm install --save-dev url-loader
		
		'url?name=[name].[ext],limit=4096'
			// each file that has size < limit (bytes) will be replaced by
			// dataurl. Unlimited by default
	
	// raw
		// load raw file (utf-8)
		$ npm install --save-dev raw-loader
		
		'raw'
	
	// html
		// require html files as static res
		$ npm install --save-dev html-loader
		
		'html'
		'html?root=path'
		'html?minimize=true'
}
================================================================================
Plugins ======================================================================={
	
	// Dont generate modules for matched requests
		new webpack.IgnorePlugin(regex)
	
	// Minify JS
		new webpack.optimize.UglifyJsPlugin(opts)
			// opts - object:
			{
				compress: {
					warnings: false,
					drop_console: false,
					unsafe: false
				},
				mangle: true,
				sourceMap: false
			}
	
	// Extract and share common code
		new webpack.optimize.CommonsChunkPlugin(opts)
			// opts - object:
			{
				name: name|name[],  // name for new module
					// passign array is equal to invoking plugin multiple times
				filename: template,  // to change dest name,
					// e.g. "[name]-common.js"
				chunks: moduleName[]  // modules from which to extract
					// default: all chunks
				minChunks: N,  // min number of requires
					// default: number of chunks
			}
			// Also chunk can be explicit,
			// e.g. to split code into vendor and application
				// Ex:
					entry: {
						app: './entry',
						vendor1: ['lib1', 'lib2']
						vendor2: ['lib3', 'lib4']
					}
					plugins: [
						new webpack.optimize.CommonsChunkPlugin({
							name: ['vendor2', 'vendor1'],
								// names equal to entries
								// webpack helpers will be defined on
								// last (vendor1), therefore place it first
								// in html
							minChunks: Infinity
						})
					]
	
	// Clear dir before build
		$ npm install --save-dev clean-webpack-plugin
		
		var CleanWebpackPlugin = require('clean-webpack-plugin');
		new CleanWebpackPlugin(path[] [, opts])
			// opts:
			{
				root: path,
				verbose: true, 
				dry: false,
				exclude: path[]
			}
	
	// Define env variables
		new webpack.DefinePlugin(opts)
			// opts - obejct:
			{
				VAR_NAME: JSON.stringify(value),
				...
			}
	
	// Generate json-map of assets paths
		$ npm install --save-dev assets-webpack-plugin
		
		var AssetsPlugin = require('assets-webpack-plugin');
		new AssetsPlugin(opts)
			// opts:
			{
				path: absDirPath,
				filename: filename
			}
	
	// Extract css
		$ npm install --save-dev extract-text-webpack-plugin@^2.0.0-beta
		
		var ExtractTextPlugin = require('extract-text-webpack-plugin');
		new ExtractTextPlugin(filename|opts)
			// for template are available: [name], [id], [contenthash]
			// opts:
			{
				filename: '[name].css',
				allChunks: false
					// set true to extract styles from all chunks
					// only from modules by default
			}
	
	// Minify images
		$ npm install --save-dev imagemin-webpack-plugin
		
		var ImageminPlugin = require('imagemin-webpack-plugin').default;
		new ImageminPlugin([opts])
			// opts:
			{
				disable: false,
				optipng: {
					optimizationLevel: 3
				},
				gifsicle: {
					optimizationLevel: 1
				},
				jpegtran: {
					progressive: false
				},
				svgo: {
				},
				pngquant: null,
				plugins: []
			}
	
	// Automatically require angular dependencies
		$ npm install --save-dev ngrequire-webpack-plugin
		
		var NgRequirePlugin = require('ngrequire-webpack-plugin');
		new NgRequirePlugin(path[])
			// path[] - paths or globs, e.g: "src/**/*.js"
}
================================================================================
Dynamic require ==============================================================={
	
	// Setup output/publicPath:
		output: {
			publicPath: '/build/'
			// ...
		}, ...
	
	// Load by require.ensure:
		require.ensure([], function(require) {
			// webpack will generate separate file
			// for "/build/libs/some/m" chunk
			var m = require('./libs/some/m');
			// ...
		}, 'chunk_name');
		// will concat chunks that have same name
	
	
	// Dynamic loading by name:
		var module = require('./pages/' + moduleName + '.ext');
		// will pack all modules /build/pages/XXX.ext to one bundle
		module();
	
	// To separate dynamic loading shunks:
		$ npm install --save-dev bundle-loader
		
		var handler = require('bundle!./pages/' + moduleName + '.ext');
		// bundle-loader will create wrapper (using require.ensure),
		// so, each chunk will be packed to separate file
		handler(function(module) {
			module();
		});
}
================================================================================
Dev server ===================================================================={
	
	// DevServer uses memory and doesnt saves files to disk.
	
	// install:
		$ npm install -g webpack-dev-server
	
	// run:
		$ webpack-dev-server
	
	// config:
		// add to webpack.config.js:
		devServer: {
			host: 'localhost',
			port: 8080,
			contentBase: __dirname,  // fallback path
			proxy: [{  // fallback url
				path: regex,
				target: fallbackUrl
			}],
			historyApiFallback: false,  // redirects to index.html (useful
				// for SPA)
			
			// to enable livereload need to add "webpack-dev-server/client"
			// to module definition
			
			hot: false  // hot module replacement
			// to enable HMR need also add "webpack/hot/dev-server"
			// and add plugin webpack.HotModuleReplacementPlugin()
			// or run server with args: webpack-dev-server --inline --hot
		}
}

================================================================================
Config example ================================================================{
	
	$ npm install -g webpack
	$ npm install -g webpack-dev-server
	$ npm install --save-dev \
		clean-webpack-plugin \
		babel-core babel-preset-es2015 babel-polyfill \
		babel-loader \
		html-loader \
		style-loader css-loader autoprefixer-loader \
		url-loader \
	
	
	var webpack = require('webpack');
	var CleanWebpackPlugin = require('clean-webpack-plugin');
	
	var src = __dirname + '/app/src';
	var build = __dirname + '/app/build';
	
	var config = {
		context: src,
		entry: {
			polyfills: ['babel-polyfill'],
			somevendor: ['lib1', 'lib2'],
			index: ['./mod1/mod1', './index'],
		},
		output: {
			path: build,
			filename: '[name].js',
			library: '[name]',
			publicPath: '/build/'
		},
		
		module: {
			rules: [{
				test: /\.js$/,
				include: [src],
				use: [
					'babel?presets=es2015'
				]
			}, {
				test: /\.html$/,
				include: [src],
				loader: 'html'
			}, {
				test: /\.css$/,
				use: [
					'style',
					'css',
					'autoprefixer'
				]
			}, {
				test: /\.(woff2?|ttf|eot|svg|png|gif|jpe?g)$/,
				loader: 'url?limit=10000'
			}]
		},
		
		plugins: [
			new CleanWebpackPlugin([build + '/*']),
			new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
			new webpack.optimize.CommonsChunkPlugin({
				name: ['somevendor', 'polyfills'],
				minChunks: Infinity
			}),
		],
		
		resolveLoader: {
			moduleExtensions: ['-loader']
		},
		
		devtool: 'source-map'
	};
	
	module.exports = config;
}
