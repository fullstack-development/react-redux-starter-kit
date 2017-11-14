const webpack = require('webpack');
const path = require('path');

const postcssReporter = require('postcss-reporter');
const postcssEasyImport = require('postcss-easy-import');
const postcssSCSS = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const doiuse = require('doiuse');


module.exports = {
    entry: {
        tests: './../karma.entry.js'
    },
    context: path.resolve(__dirname, '..', 'src'),
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
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
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            logLevel: 'debug',
                            compilerOptions: {
                                inlineSourceMap: true,
                                target: 'es5',
                                module: 'commonjs',
                            }
                        }
                    },
                    { loader: 'tslint-loader' }
                ],
            },
            // instrument only testing sources with Istanbul
            // {
            //     test: /\.tsx?$/,
            //     enforce: 'post',
            //     include: path.resolve('src'),
            //     exclude: [/node_modules/, /-tests?\.tsx?$/],
            //     loader: 'sourcemap-istanbul-instrumenter-loader?esModules&produceSourceMap'
            // },
            {
                test: /\.(png|svg)/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[ext]',
                    limit: 10000
                }
            },
            {
                test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader?name=fonts/[hash].[ext]',
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('test'),
            'process.env.__HOST__': JSON.stringify('http://localhost:8000'),
        }),
    ],

    devtool: 'inline-source-map',

    // required for enzyme to work properly
    externals: {
        'react/addons': 'react',
        'react/lib/ExecutionEnvironment': 'react',
        'react/lib/ReactContext': 'react',
        'cheerio': 'window',
    },

    node: {
        fs: 'empty'
    }
}
