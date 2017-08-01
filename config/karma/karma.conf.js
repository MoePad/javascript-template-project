var testConfig = require('../webpack/webpack.test.conf')

module.exports = function(config) {
  config.set({
    basePath: '../..',
    browsers: ['Chrome'],
    exclude: ['node_modules'],
    frameworks: ['mocha', 'karma-typescript'],
    // this is the entry file for all our tests.
    files: [
      {pattern: 'src/test/**/*.ktest0.ts', watch: false},
      {pattern: 'src/main/**/*.ts', watch: false},
      {pattern: 'src/main/**/*.vue', watch: false},
      {pattern: './config/karma/index.js', watched: false}
    ],
    preprocessors: {
        './config/karma/index.js': ['coverage', 'webpack', 'sourcemap'],
        //'./src/**/*.ts': ['coverage', 'webpack', 'sourcemap']
         './src/**/*.ts': ['webpack', 'sourcemap'],
         './src/**/*.vue': ['webpack', 'sourcemap']
      //  '*.ts': ['webpack']
    },
    webpack: {
      module: testConfig.module,
      resolve: testConfig.resolve
    },
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true,
    //logLevel: 'debug',
    reporters: ['progress'],
    colors: true,
    port: 9090,
    karmaTypescriptConfig: {
      compilerOptions: {
        module: "commonjs"
      },
      tsconfig: "./tsconfig.json",
    }
  })
}
