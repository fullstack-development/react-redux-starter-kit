const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devConfig = require('./dev.config.js');

delete devConfig.output;
devConfig.entry = {};

devConfig.plugins = [
    new ExtractTextPlugin({
        filename: 'styles.css'
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