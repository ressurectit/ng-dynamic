const {readFileSync} = require('fs');

exports.numeralResolve = require.resolve('numeral');
exports.cryptoBrowserifyResolve = require.resolve('crypto-browserify');
exports.bufferResolve = require.resolve('buffer/');
exports.streamBrowserifyResolve = require.resolve('stream-browserify');
exports.dirName = __dirname;

const packageJson = require('./package.json');
const tsConfig = readFileSync('./tsconfig.json', {encoding: 'utf8'});
const webpackConfig = readFileSync('./webpack.config.js', {encoding: 'utf8'});

exports.packageJson = packageJson;
exports.tsConfig = tsConfig;
exports.webpackConfig = webpackConfig;
exports.ngVersion = packageJson.dependencies['@angular/core'];