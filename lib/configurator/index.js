"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = config;

var _yargs = require("./yargs.js");

var _yargs2 = _interopRequireDefault(_yargs);

var _definitions = require("./definitions.js");

var _definitions2 = _interopRequireDefault(_definitions);

var _validators = require("./validators.js");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function config() {
  var pkg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var argv = arguments.length <= 1 || arguments[1] === undefined ? process.argv : arguments[1];

  var userJSConfig = pkg.statinamic || {};

  var errors = [];

  // validate user parameters
  Object.keys(userJSConfig).forEach(function (key) {
    if (!_definitions2.default[key]) {
      errors.push("Unknow option '" + key + "'.");
    } else if (_definitions2.default[key].type !== undefined && _definitions2.default[key].type !== _typeof(userJSConfig[key])) {
      errors.push("Wrong type for '" + key + "': expected '" + _definitions2.default[key].type + "', " + ("got '" + _typeof(userJSConfig[key]) + "'."));
    }
  });

  var defaultAndCLIconfig = _yargs2.default.parse(argv);

  // delete unwanted yargs parameters
  delete defaultAndCLIconfig.$0;
  delete defaultAndCLIconfig._;
  delete defaultAndCLIconfig.help;
  delete defaultAndCLIconfig.version;

  var config = _extends({}, defaultAndCLIconfig, userJSConfig);

  // validation/adjustement for each options
  Object.keys(validators).forEach(function (key) {
    validators[key]({
      pkg: pkg,
      config: config,
      definitions: _definitions2.default,
      errors: errors
    });
  });

  if (errors.length > 0) {
    throw new Error("Your config is invalid. Please fix the errors: \n- " + errors.join("\n- ") + "\n\n" + "See 'Configuration' section in documentation.");
  }

  return config;
}