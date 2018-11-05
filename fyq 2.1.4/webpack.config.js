/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-07-31 18:55:02
 * @version $Id$
 */
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: 'common',
	filename: 'common/common.js'
});
var vendorCommonsPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: 'vendor',
	filename: 'common/vendor.bundle.js'
});
var staticConfig = [{
	name: 'static',
	title: '房友圈用户协议',
	entryPath: '',
	entry: '',
	output: '',
	outputPath: '',
	tmplEntry: '',
	tmplOutput: '',
	chunks: []
}];
var config = [{
	name: 'store',
	title: '我的微店',
	entryPath: '',
	entry: '',
	output: '',
	outputPath: '',
	tmplEntry: '',
	tmplOutput: '',
	chunks: ['common', 'vendor', 'store']
}, {
	name: 'graph',
	title: '统计报表',
	entryPath: '',
	entry: '',
	output: '',
	outputPath: '',
	tmplEntry: '',
	tmplOutput: '',
	chunks: ['common', 'vendor', 'graph']
}, {
	name: 'inform',
	title: '资讯详情',
	entryPath: '',
	entry: '',
	output: '',
	outputPath: '',
	tmplEntry: '',
	tmplOutput: '',
	chunks: ['common', 'vendor', 'inform']
}];

function initConfig(config) {
	config.forEach((item, index) => {
		item.entryPath = path.join(__dirname, './src/' + item.name);
		item.entry = path.join(item.entryPath, '/Store.js');
		item.outputPath = path.join(__dirname, './dist/' + item.name);
		item.tmplEntry = path.join(item.entryPath, 'tmpl/' + item.name + '.html');
		item.tmplOutput = path.join(item.outputPath, 'index.html');
	});
}

function genarateEntry(config, def) {
	let entrys = def || {};
	config.forEach((item, index) => {
		entrys[item.name] = item.entry;
	});
	return entrys;
}

function genarateHtmlPlugin(config) {
	return config.map((item, index) => {
		return new HtmlWebpackPlugin({
			template: item.tmplEntry,
			title: '',
			hash: true,
			favicon: path.join(__dirname, './src/commons/images/favicon.ico'),
			inject: 'body',
			filename: item.tmplOutput,
			chunks: item.chunks
		});
	});
}

function genarateStaticHtmlPlugin(config) {
	return config.map((item, index) => {
		return new HtmlWebpackPlugin({
			template: item.tmplEntry,
			title: '',
			inject: 'body',
			filename: item.tmplOutput,
			chunks: item.chunks
		});
	});
}

function genarateRewrites(config) {
	return config.map((item, index) => {
		return {
			from: new RegExp('^\/wap/' + item.name),
			to: '/' + item.name + '/index.html'
		};
	});
}

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var definePlugin = new webpack.DefinePlugin({
	"process.env": {
		NODE_ENV: JSON.stringify("production")
	}
});
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	output: {
		comments: false, // remove all comments
	},
	compress: {
		warnings: false
	},
	mangle: {
		except: ['$', 'exports', 'require']
	}
});
var providePlugin = new webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery',
	'window.jQuery': 'jquery'
});
var webpackConfig = (config) => {
	initConfig(config);
	let htmlPlugins = genarateHtmlPlugin(config);
	let entrys = genarateEntry(config, {
		vendor: ['react', 'react-dom', 'react-router'],
	});
	return {
		plugins: [vendorCommonsPlugin, commonsPlugin, providePlugin, new ExtractTextPlugin('css/[name].css', {
			allChunks: true
		}), ...htmlPlugins, definePlugin, uglifyJsPlugin],
		entry: entrys,
		output: {
			path: './dist/',
			publicPath: '/wap/',
			filename: '[name]/js/[name].bundle.js',
			chunkFilename: '[name].bundle.js'
		},
		module: {
			loaders: [{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(["css-loader"])
			}, {
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			}, {
				test: /\.jsx$/,
				loader: 'jsx?harmony&name=js/[name].[ext]'
			}, {
				test: /\.scss$/,
				loader: 'style-loader!css-loader!scss-loader?sourceMap'
			}, {
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(["css-loader", "less-loader"])
			}, {
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=100&name=images/[name].[ext]'
			}, {
				test: /\.(woff2|woff|ttf|eot|svg|otf)$/,
				loader: 'url-loader?limit=100&name=css/font/[name].[ext]'
			}]
		},
		resolve: {
			root: ' ',
			extensions: ['', '.js', '.scss', '.json', '.jsx'],
			alias: {
				jquery: path.join(__dirname, './src/commons/lib/jquery-2.1.4.min.js')
			},
			Caching: true
		},
		externals: {
			Swipe: 'Swipe',
			lazyload: 'lazyload'
		},
		devServer: {
			//host: '10.58.2.137',
			proxy: {
				'/fyq/*': {
					// "target": 'http://10.4.18.33:49754',
					"target": 'http://10.1.245.5:49754',
					// "target": 'http://10.58.8.131:49755',
					"host": "localhost",
					"port": 8080,
					"secure": false
				}
			},
			historyApiFallback: {
				rewrites: genarateRewrites(config)
			/*rewrites: [{
				from: /^\/$/,
				to: '/views/landing.html'
			}, {
				from: /^\/subpage/,
				to: '/views/subpage.html'
			}, {
				from: /./,
				to: '/views/404.html'
			}]*/
			}
		},
		debug: true
	}
};

module.exports = webpackConfig(config);
