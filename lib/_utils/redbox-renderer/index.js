"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _redboxReact = require("redbox-react");

var _redboxReact2 = _interopRequireDefault(_redboxReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderer = function renderer(error) {
  var component = _server2.default.renderToStaticMarkup(_react2.default.createElement(_redboxReact2.default, {
    error: error
  }));
  return "<!doctype html><html><body>" + component + "</body></html>";
};

exports.default = renderer;