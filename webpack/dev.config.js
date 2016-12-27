const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
        app: './index.tsx',
        vendor: [
            'axios',
            'react',
            'redux',
            'bem-cn',
            'immutable',
            'react-dom',
            'react-redux',
            'redux-thunk',
            'react-router',
            'react-bootstrap',
            'react-tap-event-plugin',
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'app.bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { logLevel: 'debug' }
                    },
                    'tslint-loader'
                ],
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader?name=fonts/[hash].[ext]',
            },
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract({
                    loader: 'css-loader'
                })
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    loader: ['css-loader?modules', 'stylus-loader']
                }),
            },
            {
                test: /\.(png|svg)/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[ext]',
                    limit: 10000
                }
            },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity,
        }),
        new ExtractTextPlugin({
            filename: 'styles.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __HOST__: JSON.stringify('http://localhost:8000'),
        }),
    ],
    watch: true,
    devServer: {
        contentBase: path.resolve('..', 'build'),
        host: '0.0.0.0',
        port: 8080,
        watch: true,
        historyApiFallback: true,
        stats: 'errors-only',
    }
};
