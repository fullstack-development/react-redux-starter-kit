const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        filename: 'js/app.bundle.js'
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
                loader:  ['style-loader', 'css-loader']
            },
            {
                test: /\.styl$/,
                loader: ['style-loader', 'css-loader?modules', 'stylus-loader']
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.bundle.js',
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.__HOST__': JSON.stringify('http://localhost:3000'),
        }),
    ],

    devServer: {
        contentBase: path.resolve('..', 'build'),
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        historyApiFallback: true,
        stats: 'errors-only',
    }
};
