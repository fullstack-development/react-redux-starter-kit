const webpack = require('webpack');
const devConfig = require('./dev.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const prodConfig = Object.assign({}, devConfig);
const stylLoader = {
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract({
        loader: 'css-loader?modules!autoprefixer-loader?browsers=last 2 version!stylus-loader'
    })
};

const cssLoader = {
    test: /\.css$/,
    loader:  ExtractTextPlugin.extract({
        loader: 'css-loader',
        fallbackLoader: 'style-loader',
    })
};

const scriptsLoader = {
    test: /\.(ts|tsx)$/,
    use: [
        {
            loader: 'babel-loader',
            options: { presets: ['es2015'], plugins: ["transform-regenerator"] }
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
        filename: 'css/[name].css',
        allChunks: true,
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'assets/index.html'
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify('production'),
            __HOST__: JSON.stringify('http://localhost:3000'),
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
        },
        output: {
            comments: false
        },
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'js/vendor.bundle.js',
        minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'shared',
        filename: 'js/shared.bundle.js',
        chunks: ['app']
    }),
];


prodConfig.devServer.hot = false;

module.exports = prodConfig;
