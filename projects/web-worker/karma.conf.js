const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['webpack', 'jasmine'],
        files: [
            './tests.ts',
            './angular/test/*.spec.ts',
            './common/test/*.spec.ts',
            './testing/test/*.spec.ts',
            './worker/test/*.spec.ts'
        ],
        exclude: [
            './node_modules',
            './dist'
        ],
        mode: 'development',
        reporters: ['kjhtml'],
        preprocessors: {
            '**/*.ts': ['webpack']
        },
        webpack: {
            resolve: {
                extensions: ['.js', '.ts', '.tsx'],
                plugins: [
                    new TsconfigPathsPlugin({ configFile: './tsconfig.spec.json' })
                ],
                alias: {
                    'angular-web-worker/common': path.resolve(__dirname, 'common/src/public-api.ts'),
                }
            },
            mode: 'development',
            stats: {
                warnings: false
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        exclude: [/node_modules/],
                        use: {
                            loader: 'ts-loader',
                            options: {
                                configFile: 'tsconfig.spec.json'
                            }
                        }
                    },
                ]
            },
        },
        port: 9867,
        browsers: ['Chrome'],
        logLevel: config.LOG_INFO,
        colors: true,
        client: {
            clearContext: false,
        },
        coverageInstanbulReporter: {
            reports: ['html', 'lcovonly']
        },
        autoWatch: true,
        singleRun: false
    });
};