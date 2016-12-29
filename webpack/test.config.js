const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const devConfig = require('./dev.config.js');

delete devConfig.output;
devConfig.entry = {};

devConfig.plugins = [
    new ExtractTextPlugin({
        filename: 'styles.css'
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('test'),
        'process.env.__HOST__': JSON.stringify('http://localhost:8000'),
    }),
];
devConfig.node = {
    fs: 'empty'
};

// required for enzyme to work properly
devConfig.externals = {
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
    'cheerio': 'window',
}

module.exports = devConfig;