"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Html = function (_Component) {
  _inherits(Html, _Component);

  function Html() {
    _classCallCheck(this, Html);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Html).apply(this, arguments));
  }

  _createClass(Html, [{
    key: "render",
    value: function render() {
      var manifest = this.props.manifest;


      var htmlProps = _extends({
        lang: "en"
      }, manifest !== "" && {
        manifest: manifest
      });
      return _react2.default.createElement(
        "html",
        htmlProps,
        _react2.default.createElement("head", {
          dangerouslySetInnerHTML: {
            __html: this.props.head
          }
        }),
        _react2.default.createElement(
          "body",
          null,
          _react2.default.createElement("div", {
            id: "statinamic",
            dangerouslySetInnerHTML: {
              __html: this.props.body
            }
          }),
          _react2.default.createElement("script", {
            dangerouslySetInnerHTML: {
              __html: this.props.script
            }
          }),
          this.props.children
        )
      );
    }
  }]);

  return Html;
}(_react.Component);

Html.propTypes = {
  head: _react.PropTypes.string.isRequired,
  body: _react.PropTypes.string.isRequired,
  script: _react.PropTypes.string.isRequired,
  manifest: _react.PropTypes.string,
  children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object])
};
Html.defaultProps = {
  manifest: ""
};
exports.default = Html;