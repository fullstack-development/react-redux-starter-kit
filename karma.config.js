module.exports = function (config) {
    config.set({
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'source-map-support', "snapshot", "mocha-snapshot"],
        client: {
            captureConsole: true,
        },
        browserNoActivityTimeout: 30000,

        // list of files / patterns to load in the browser
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            "**/__snapshots__/**/*.md",
            'karma.entry.js',
        ],

        exclude: [],

        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "**/__snapshots__/**/*.md": ["snapshot"],
            'karma.entry.js': ['webpack'],
        },

        remapIstanbulReporter: {
            remapOptions: {}, //additional remap options
            reports: {
                html: 'coverage'
            },
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'karma-remap-istanbul'],
        mochaReporter: {
            showDiff: true,
        },

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
            "karma-coverage",
            "karma-snapshot",
            "karma-mocha-snapshot",
            "karma-remap-istanbul",
            "karma-mocha-reporter",
            "karma-chrome-launcher",
            "karma-source-map-support",
            "karma-phantomjs-launcher",
        ],

        webpack: require('./webpack/test.config'),

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        webpackMiddleware: {
            noInfo: true
        },

        // Snapshots https://github.com/localvoid/karma-snapshot
        snapshot: {
            update: !!process.env.UPDATE,
            prune: !!process.env.PRUNE,
        },
    })
};