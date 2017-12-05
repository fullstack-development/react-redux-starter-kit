const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssReporter = require('postcss-reporter');
const postcssEasyImport = require('postcss-easy-import');
const postcssSCSS = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const doiuse = require('doiuse');

module.exports = {
    target: 'web',
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
        app: [
          'react-hot-loader/patch',
          './index.tsx'
        ],
        vendor: [
            'uuid',
            'axios',
            'react',
            'redux',
            'bem-cn',
            'reselect',
            'immutable',
            'inversify',
            'prop-types',
            'react-dom',
            'react-redux',
            'react-router',
            'react-select',
            'react-bootstrap',
            'reflect-metadata',
            'inversify-inject-decorators',
            // 'react-tap-event-plugin',
            'bootstrap/dist/css/bootstrap.min.css',
            './assets/bootstrap.paper.min.css',
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'js/[name]-[hash].bundle.js',
        chunkFilename: 'js/[name]-[hash].bundle.js',
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
                    { loader: 'react-hot-loader/webpack' },
                    { loader: 'awesome-typescript-loader' },
                    { loader: 'tslint-loader' }
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
                test: /\.scss$/,
                loader: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    autoprefixer({browsers: ['last 2 versions']}),
                                ];
                            },
                        },
                    },
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            syntax: postcssSCSS,
                            plugins: function () {
                                return [
                                    postcssEasyImport({
                                        extensions: '.scss',
                                    }),
                                    stylelint(),
                                    doiuse({
                                        browsers:['ie >= 11', 'last 2 versions'],
                                        ignore: ['flexbox', 'rem'],
                                        ignoreFiles: ['**/normalize.css'],
                                    }),
                                    postcssReporter({
                                        clearReportedMessages: true,
                                        throwError: true,
                                    }),
                                ];
                            },
                        },
                    },
                ],
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
            filename: 'js/[name]-[hash].bundle.js',
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
        new webpack.NamedModulesPlugin(),
    ],

    devServer: {
        contentBase: path.resolve('..', 'build'),
        host: '0.0.0.0',
        port: 8080,
        inline: true,
        lazy: false,
        hot: true,
        historyApiFallback: true,
        disableHostCheck: true,
        stats: 'errors-only',
    }
};
