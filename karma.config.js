var webpackConfig = require('./webpack/test.config');

module.exports = function (config) {
    config.set({
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],
        client: {
            captureConsole: true,
        },
        browserNoActivityTimeout: 30000,

        // list of files / patterns to load in the browser
        files: [
            'tests.js'
        ],

        exclude: [],

        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'tests.js': ['webpack']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // web server port
        port: 9876,
        colors: true,
        autoWatch: true,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],
        plugins: [
            "karma-chai",
            "karma-sinon",
            "karma-mocha",
            "karma-webpack",
            "karma-mocha-reporter",
            "karma-chrome-launcher",
            "karma-phantomjs-launcher",
        ],

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        }
    })
};