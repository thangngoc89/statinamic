"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Link = Link;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Link(props, _ref) {
  var router = _ref.router;

  return _react2.default.createElement(
    _reactRouter.Link,
    _extends({}, props, {
      className: (0, _classnames2.default)(props.className, _defineProperty({}, props.activeClassName, router && (router.isActive({ pathname: props.to }) || router.isActive({ pathname: props.to + "index.html" })) && props.activeClassName))
    }),
    props.children
  );
}

Link.propTypes = {
  children: _react.PropTypes.node,
  to: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  activeClassName: _react.PropTypes.string
};

Link.contextTypes = {
  router: _react.PropTypes.object.isRequired
};

Link.displayName = "Link";

/*
  exported as default and Link so people can easily switch their
  import { Link } from "react-router"
  to
  import { Link } from "statinamic/lib/Link"
  or
  import Link from "statinamic/lib/Link"
*/
exports.default = Link;