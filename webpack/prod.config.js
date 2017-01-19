const webpack = require('webpack');
const devConfig = require('./dev.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const prodConfig = Object.assign({}, devConfig);
const stylLoader = {
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract({
        loader: ['css-loader?modules', 'stylus-loader']
    })
};

const cssLoader = {
    test: /\.css$/,
    loader:  ExtractTextPlugin.extract({
        loader: 'css-loader'
    })
}

const scriptsLoader = {
    test: /\.(ts|tsx)$/,
    use: [
        {
            loader: 'babel-loader',
            options: { presets: ['es2015'], plugins: ["transform-regenerator"]}
        },
        {
            loader: 'ts-loader',
            options: { logLevel: 'debug' }
        },
        'tslint-loader'
    ],
};

// replace modules, if already exists modules with same patterns
prodConfig.module.rules = prodConfig.module.rules.map(loader => {
    switch (loader.test.toString()) {
        case stylLoader.test.toString():
            return stylLoader;
        case cssLoader.test.toString():
            return cssLoader;
        case scriptsLoader.test.toString():
            return scriptsLoader;
        default: return loader;
    }
});

prodConfig.plugins = [
    new ExtractTextPlugin({
        filename: 'css/styles.css'
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
        filename: 'js/vendor.bundle.js',
        minChunks: Infinity,
    })
];


prodConfig.devServer.hot = false;

module.exports = prodConfig;
