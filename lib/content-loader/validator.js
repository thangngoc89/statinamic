"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _lruMemoize = require("lru-memoize");

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fieldTypes = {
  context: "string",
  renderer: "function",
  feedsOptions: "object",
  feeds: "object",
  description: "object"
};

var validator = function validator() {
  var userConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var errors = [];

  Object.keys(userConfig).forEach(function (key) {
    if (!fieldTypes[key]) {
      errors.push("Unknow option '" + key + "'.");
    } else if (fieldTypes[key] !== _typeof(userConfig[key])) {
      errors.push("Wrong type for '" + key + "': expected '" + fieldTypes[key] + "', " + ("got '" + _typeof(userConfig[key]) + "'."));
    }
  });

  if (errors.length > 0) {
    throw new Error("Your 'content-loader' config is invalid. Please fix the errors: \n- " + errors.join("\n- ") + "\n\n" + "See 'Configuration' section in documentation.");
  }
};

exports.default = (0, _lruMemoize2.default)(10)(validator);