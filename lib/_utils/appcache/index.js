"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _globby = require("globby");

var _globby2 = _interopRequireDefault(_globby);

var _path = require("path");

var _fsPromise = require("fs-promise");

var _template = require("./template");

var _template2 = _interopRequireDefault(_template);

var _joinUri = require("../join-uri");

var _joinUri2 = _interopRequireDefault(_joinUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var writeAppcache = function writeAppcache(distPath, baseUrl, pattern) {
  var destination = (0, _path.join)(distPath, "manifest.appcache");
  var fallback = (0, _joinUri2.default)("/", baseUrl, "/");

  return (0, _globby2.default)(pattern, {
    cwd: distPath,
    nodir: true
  }).then(function (files) {
    return files.map(function (file) {
      return (0, _joinUri2.default)("/", baseUrl, file);
    });
  }).then(function (files) {
    return Promise.all([(0, _fsPromise.writeFile)(destination, (0, _template2.default)(files, fallback))]);
  });
};

exports.default = writeAppcache;