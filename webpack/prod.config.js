const webpack = require('webpack');
const devConfig = require('./dev.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.assign({}, devConfig, {
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          __HOST__: JSON.stringify(process.env.API_URL),
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: true,
            comments: false,
            sourceMap: false,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity,
        })
    ]
});
