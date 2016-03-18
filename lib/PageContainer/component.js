"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _urlify = require("../_utils/urlify");

var _urlify2 = _interopRequireDefault(_urlify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable react/sort-comp */


// react-router does not return leading and trailing slashes
// so we need to normalize according to collection data
var splatToUrl = function splatToUrl(string) {
  return "/" + (0, _urlify2.default)(string);
};

var isDevelopment = function isDevelopment() {
  return process.env.NODE_ENV !== "production";
};
var isClient = function isClient() {
  return typeof window !== "undefined";
};
var isDevelopmentClient = function isDevelopmentClient() {
  return isDevelopment() && isClient();
};

var catchLinks = void 0;
var browserHistory = void 0;

if (isClient()) {
  catchLinks = require("../_utils/catch-links").default;
  browserHistory = require("../client").browserHistory;
}

function find(collection, pageUrl) {
  return collection.find(function (item) {
    return item.__url === pageUrl || item.__url === pageUrl + "/" || item.__resourceUrl === pageUrl;
  });
}

var PageContainer = function (_Component) {
  _inherits(PageContainer, _Component);

  function PageContainer() {
    _classCallCheck(this, PageContainer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PageContainer).apply(this, arguments));
  }

  _createClass(PageContainer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.preparePage(this.props, this.context);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.catchInternalLink();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.preparePage(nextProps, this.context);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.catchInternalLink();
    }
  }, {
    key: "catchInternalLink",
    value: function catchInternalLink() {
      var _this2 = this;

      if (!isClient()) {
        return;
      }

      if (this._content) {
        var layoutDOMElement = (0, _reactDom.findDOMNode)(this._content);
        if (layoutDOMElement) {
          catchLinks(layoutDOMElement, function (href) {
            var pageUrl = href.replace(process.env.STATINAMIC_PATHNAME, "/");
            if (!find(_this2.context.collection, pageUrl)) {
              return false;
            }
            if (browserHistory) {
              browserHistory.push(pageUrl);
            }
            return true;
          });
        }
      }
    }
  }, {
    key: "preparePage",
    value: function preparePage(props, context) {
      if (!context.layouts[props.defaultLayout]) {
        console.error("statinamic: PageContainer: " + ("default layout \"" + props.defaultLayout + "\" doesn't exist. ") + "Please check your configuration (\"layouts\" part). " + ("If you haven't defined \"" + props.defaultLayout + "\", you should. "));
      }

      var pageUrl = splatToUrl(props.params.splat);
      if (isDevelopmentClient()) {
        console.info("statinamic: PageContainer: '" + pageUrl + "' rendering...");
      }

      var item = find(context.collection, pageUrl);
      if (isClient() && item) {
        // adjust url (eg: missing trailing slash)
        var currentExactPageUrl = window.location.href.replace(window.location.protocol + "//" + window.location.host + process.env.STATINAMIC_PATHNAME, "/").replace(window.location.hash, "");

        if (currentExactPageUrl !== item.__url) {
          console.info("statinamic: PageContainer: " + ("replacing by '" + currentExactPageUrl + "' to '" + item.__url + "'"));
          if (browserHistory) {
            browserHistory.replace(item.__url);
          }
        }
      }

      var page = props.pages[pageUrl];
      if (!page) {
        if (item) {
          props.getPage(item.__url, item.__dataUrl);
        } else {
          console.error("statinamic: PageContainer: " + (pageUrl + " is a page not found."));
          props.setPageNotFound(pageUrl);
        }
      } else {
        if (page.error) {
          return;
        }

        var Layout = this.getLayout(props, context, page);
        if (page.type !== undefined && !Layout) {
          console.error("statinamic: PageContainer: " + ("Unkown page type: \"" + page.type + "\" component not available in ") + "\"layouts\" property. " + ("Please check the \"layout\" or \"type\" of page \"" + page + "\" header."));
        }
      }
    }
  }, {
    key: "getLayout",
    value: function getLayout(props, context, page) {
      return context.layouts[page.type || props.defaultLayout];
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var pageUrl = splatToUrl(this.props.params.splat);
      var page = this.props.pages[pageUrl];

      if (!page) {
        if (isDevelopmentClient()) {
          console.info("statinamic: PageContainer: '" + pageUrl + "' no data");
        }
        return null;
      }
      if (isDevelopmentClient()) {
        console.info("statinamic: PageContainer: '" + pageUrl + "'", page);
      }

      if ((typeof page === "undefined" ? "undefined" : _typeof(page)) !== "object" || page.toString() !== "[object Object]") {
        console.info("statinamic: PageContainer: page " + pageUrl + " should be an object");
        return null;
      }

      var _context$layouts = this.context.layouts;
      var PageLoading = _context$layouts.PageLoading;
      var PageError = _context$layouts.PageError;

      var Layout = this.getLayout(this.props, this.context, page);

      return _react2.default.createElement(
        "div",
        null,
        !page.error && page.loading && PageLoading && _react2.default.createElement(PageLoading, null),
        !!page.error && !PageError && _react2.default.createElement(
          "div",
          { style: { "text-align": "center" } },
          _react2.default.createElement(
            "h1",
            null,
            page.error
          ),
          _react2.default.createElement(
            "p",
            null,
            page.errorText
          )
        ),
        !!page.error && PageError && _react2.default.createElement(PageError, page),
        !page.error && !page.loading && Layout && _react2.default.createElement(Layout, _extends({ ref: function ref(_ref) {
            return _this3._content = _ref;
          } }, page))
      );
    }
  }]);

  return PageContainer;
}(_react.Component);

PageContainer.propTypes = {
  pages: _react.PropTypes.object.isRequired,
  params: _react.PropTypes.object,

  defaultLayout: _react.PropTypes.string,

  // actions
  getPage: _react.PropTypes.func.isRequired,
  setPageNotFound: _react.PropTypes.func.isRequired
};
PageContainer.contextTypes = {
  collection: _react.PropTypes.array.isRequired,
  layouts: _react.PropTypes.object.isRequired
};
PageContainer.defaultProps = {
  defaultLayout: "Page"
};
exports.default = PageContainer;