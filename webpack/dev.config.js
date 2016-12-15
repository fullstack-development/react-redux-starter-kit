const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '..', 'src'),
    entry: './index.tsx',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {test: /\.(ts|tsx)$/, use: ['babel-loader', 'ts-loader']},
            {
                test: /\.(svg|ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader?name=fonts/[hash].[ext]',
            },
            {test: /.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: { modules: true } },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png)/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[ext]',
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html'
        })
    ],
    watch: true,
    devServer: {
        contentBase: path.resolve('..', 'build'),
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true,
        watch: true
    }
};
