"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config, files, log) {
  log(_chalk2.default.green("✓ Static html files: " + files.length + " files written."));

  var promises = [];

  if (config.CNAME) {
    promises.push((0, _fsPromise.writeFile)((0, _path.join)(config.cwd, config.destination, "CNAME"), config.baseUrl.hostname).then(function () {
      return log(_chalk2.default.green("✓ CNAME is " + config.baseUrl.hostname + "."));
    }));
  }

  if (config.nojekyll) {
    promises.push((0, _fsPromise.writeFile)((0, _path.join)(config.cwd, config.destination, ".nojekyll"), "").then(function () {
      return log(_chalk2.default.green("✓ .nojekyll created."));
    }));
  }

  if (config.appcache) {
    promises.push((0, _appcache2.default)((0, _path.join)(config.cwd, config.destination), config.baseUrl.pathname, config.appcache).then(function () {
      return log(_chalk2.default.green("✓ manifest.appcache created."));
    }));
  }

  return Promise.all(promises).then(function () {
    return log(_chalk2.default.green("✓ Build successful."));
  });
};

var _path = require("path");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _fsPromise = require("fs-promise");

var _appcache = require("../_utils/appcache");

var _appcache2 = _interopRequireDefault(_appcache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }