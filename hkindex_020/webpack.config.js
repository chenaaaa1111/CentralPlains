/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-07-31 18:55:02
 * @version $Id$
 */
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin("js/common.js");
var vendorCommonsPlugin = new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.bundle.js");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var htmlPlugin = new HtmlWebpackPlugin({
	template: './src/a.html',
	title: '中原A+移动端',
	filename: 'index.html',
	inject: 'body'
});
var definePlugin = new webpack.DefinePlugin({
	"process.env": {
		NODE_ENV: JSON.stringify("production")
	}
});
var dedupePlugin = new webpack.optimize.DedupePlugin();
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	output: {
		comments: false, // remove all comments
	},
	compress: {
		warnings: false
	}
});
var providePlugin = new webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery',
	'window.jQuery': 'jquery'
});
module.exports = {
	plugins: [dedupePlugin, vendorCommonsPlugin, commonsPlugin, htmlPlugin, providePlugin, new ExtractTextPlugin('css/[name].css'), definePlugin, uglifyJsPlugin],
	entry: {
		vendor: ['react', 'react-dom', 'react-router', 'react-redux'],
		main: './src/js/routers.js'
	},
	output: {
		path: './dist/',
		// path: './MobileExtend/',
		publicPath: '/MobileExtend/admanager/',
		chunkFilename: 'js/[name].chunk.js',
		filename: 'js/[name].bundle.js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
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
			loader: "style-loader!css-loader!less-loader?sourceMap&name=less/[name].[ext]"
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192&name=images/[name].[ext]'
		}, {
			test: /\.(woff2|woff|ttf|eot|svg|otf)$/,
			loader: 'url-loader?limit=100&name=css/font/[name].[ext]'
		}]
	},
	resolve: {
		root: ' ',
		extensions: ['', '.js', '.scss', '.json', '.jsx'],
		alias: {
			jquery: path.join(__dirname, './src/js/lib/jquery-2.1.4.min.js')
		},
		Caching: true
	},
	externals: {
		// Swipe: 'Swipe',
		// lazyload: 'lazyload',
		// PinchZoom: 'PinchZoom'
	},
	devServer: {
		 host:"10.58.2.124",
		proxy: {
			'/api/*': {
				 target:"http://10.3.19.146:15062",//新的测试地址
				// target:"http://10.3.19.146:15061",//新的测试地址
				// "target": 'http://10.3.19.146:9311',//以前测试地址
				//"target": "http://10.5.235.24:29263",
				"host": "localhost",
				"port": 8080,
				"secure": false
			}
		// '/api/external/*': {
		// 	"target": 'http://10.3.19.146:9311',
		// 	"host": "localhost",
		// 	"port": 8080,
		// 	"secure": false
		// }
		},
		historyApiFallback: true
	},
	debug: true
}
