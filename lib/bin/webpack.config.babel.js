"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _os = require("os");

var config = require(process.env.STATINAMIC_CONFIG).default;

// TODO warn about config like entry
// TODO warn for output config

// mostly here, you will find babel-plugin-webpack-loaders requirements
exports.default = _extends({}, config.webpackConfig, {

  output: _extends({}, config.webpackConfig.output, {

    // for node usage
    libraryTarget: "commonjs2",

    // https://github.com/istarkov/babel-plugin-webpack-loaders/issues/51
    filename: undefined,

    // prevent babel-plugin-webpack-loaders emited files to be in your dist
    // folder, see // https://github.com/MoOx/statinamic/issues/214
    path: (0, _os.tmpdir)()
  })
});