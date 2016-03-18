"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMetas = undefined;

exports.default = function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var baseUrl = _ref.baseUrl;
  var css = _ref.css;

  var metas = [].concat(defaultMetas);

  if (css && Array.isArray(css)) {
    css.forEach(function (fileName) {
      var path = (0, _joinUri2.default)(baseUrl.pathname, fileName);
      metas.push("<link rel=\"stylesheet\" href=\"" + path + "\" />");
    });
  }

  return metas;
};

var _joinUri = require("../join-uri");

var _joinUri2 = _interopRequireDefault(_joinUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultMetas = exports.defaultMetas = ["<meta charset=\"utf-8\" />", "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />", "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />"];