"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return (0, _toHtml2.default)(config).then(function (files) {
    return (0, _postbuild2.default)(config, files, log);
  }).catch(function (error) {
    log(_chalk2.default.red("✗ Static build failed"));
    setTimeout(function () {
      throw error;
    }, 1);
  });
};

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _toHtml = require("./to-html");

var _toHtml2 = _interopRequireDefault(_toHtml);

var _postbuild = require("./postbuild");

var _postbuild2 = _interopRequireDefault(_postbuild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)("statinamic:static");