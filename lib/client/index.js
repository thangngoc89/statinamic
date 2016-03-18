"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserHistory = undefined;
exports.default = statinamic;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Router = require("react-router/lib/Router");

var _Router2 = _interopRequireDefault(_Router);

var _useRouterHistory = require("react-router/lib/useRouterHistory");

var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);

var _createBrowserHistory = require("history/lib/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _reactRedux = require("react-redux");

var _ContextProvider = require("../ContextProvider");

var _ContextProvider2 = _interopRequireDefault(_ContextProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserHistory = exports.browserHistory = typeof window !== "undefined" // just for node testing
? (0, _useRouterHistory2.default)(_createBrowserHistory2.default)({
  basename: process.env.STATINAMIC_PATHNAME
}) : null;
// App


function statinamic(_ref) {
  var layouts = _ref.layouts;
  var metadata = _ref.metadata;
  var routes = _ref.routes;
  var store = _ref.store;

  var collection = typeof window !== "undefined" ? window.__COLLECTION__ : [];

  _reactDom2.default.render(_react2.default.createElement(
    _ContextProvider2.default,
    {
      collection: collection,
      layouts: layouts,
      metadata: metadata
    },
    _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(_Router2.default, { history: browserHistory, routes: routes })
    )
  ), document.getElementById("statinamic"));
}