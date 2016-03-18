"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref) {
  var pkg = _ref.pkg;
  var config = _ref.config;

  var devUrl = "http://" + config.devHost + ":" + config.devPort + "/";
  var prodBaseUrl = _url2.default.parse(pkg.homepage ? pkg.homepage : devUrl);
  config.baseUrl = config.production ? prodBaseUrl : _extends({}, _url2.default.parse(devUrl), {
    // get base from prod url
    pathname: prodBaseUrl.path ? prodBaseUrl.path : "/"
  });

  // ensure trailing slash
  if (config.baseUrl.pathname && !config.baseUrl.pathname.endsWith("/")) {
    config.baseUrl.pathname = config.baseUrl.pathname + "/";
  }

  // update config.baseUrl.href since pathname has been updated
  // the usage of the spread operator is to avoid having the "magic" Object
  // returned by node (eg: make assertions difficult)
  config.baseUrl = _extends({}, _url2.default.parse(_url2.default.format(config.baseUrl)));

  // Set basename to process.env for universal usage
  process.env.STATINAMIC_PATHNAME = config.baseUrl.pathname;
};

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }