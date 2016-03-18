"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (options) {
  var config = options.config;
  var store = options.store;
  var exports = options.exports;


  var log = (0, _debug2.default)("statinamic:builder");

  var destination = _path2.default.join(config.cwd, config.destination);
  _fsExtra2.default.emptyDirSync(destination);

  if (config.static) {
    // Copy static assets to build folder
    if (config.assets) {
      var copyDest = _path2.default.join(destination, config.assets.route);
      _fsExtra2.default.copySync(config.assets.path, copyDest);
      log(_chalk2.default.green("✓ Static assets: copy static assets completed"));
    }

    (0, _webpack2.default)(config.webpackConfigClient, log, function (stats) {
      log(_chalk2.default.green("✓ Static assets: client build completed"));

      var assetsFiles = {
        css: [],
        js: []
      };
      var assets = stats.toJson().assetsByChunkName;

      // Flatten object of arrays
      // sort a-z => predictable chunks order
      Object.keys(assets).reduce(function (result, key) {
        var chunkAssets = assets[key];
        return result.concat(chunkAssets);
      }, []).sort(function (a, b) {
        return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
      }).forEach(function (name) {
        if (name.endsWith(".js")) {
          assetsFiles.js.push(name);
        } else if (name.endsWith(".css")) {
          assetsFiles.css.push(name);
        }
      });

      (0, _static2.default)(_extends({}, config, {
        urls: [].concat(_toConsumableArray(options.urls || []), _toConsumableArray(_cache2.default.map(function (item) {
          return item.__url;
        }))),
        collection: _cache2.default,
        assetsFiles: assetsFiles,
        exports: exports,
        store: store
      })).then(function () {
        if (config.server) {
          (0, _server2.default)({ config: config });
        }
      }).catch(function (error) {
        log(_chalk2.default.red("✗ Faild to start static server"));
        setTimeout(function () {
          throw error;
        }, 1);
      });
    });
  } else if (config.server) {
    (0, _server2.default)({
      config: config,
      exports: exports,
      store: store
    });
  } else {
    throw new Error("You need to specify --static or --server");
  }
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _webpack = require("./webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _server = require("./server");

var _server2 = _interopRequireDefault(_server);

var _cache = require("../content-loader/cache");

var _cache2 = _interopRequireDefault(_cache);

var _static = require("../static");

var _static2 = _interopRequireDefault(_static);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }