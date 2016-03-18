"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (url, _ref, testing) {
  var exports = _ref.exports;
  var collection = _ref.collection;
  var store = _ref.store;
  var baseUrl = _ref.baseUrl;
  var assetsFiles = _ref.assetsFiles;
  var appcache = _ref.appcache;

  var _importExports = (0, _importExports3.default)(exports);

  var layouts = _importExports.layouts;
  var metadata = _importExports.metadata;
  var routes = _importExports.routes;


  var render = _server2.default[!testing ? "renderToString" : "renderToStaticMarkup"];

  return new Promise(function (resolve, reject) {
    var defaultMetas = (0, _htmlMetas2.default)({
      baseUrl: baseUrl,
      css: assetsFiles.css
    }).join("");

    try {
      (0, _reactRouter.match)({
        routes: routes,
        location: url,
        basename: baseUrl.pathname
      }, function (error, redirectLocation, renderProps) {
        var head = void 0;
        var body = void 0;
        var script = void 0;

        if (error) {
          return reject(error);
        } else if (redirectLocation) {
          // TODO add a redirect page à la "jekyll redirect plugin"
          throw new Error("statinamic (static) doesn't handle redirection yet");
        } else if (!renderProps) {
          throw new Error("statinamic (static) doesn't handle page not found yet");
        } else {
          var collectionMin = (0, _minify2.default)(collection);
          // render app body as "react"ified html (with data-react-id)
          body = render(_react2.default.createElement(
            _ContextProvider2.default,
            {
              collection: collectionMin,
              layouts: layouts,
              metadata: metadata
            },
            _react2.default.createElement(
              _reactRedux.Provider,
              { store: store },
              _react2.default.createElement(_reactRouter.RouterContext, renderProps)
            )
          ));

          var headTags = _reactHelmet2.default.rewind();

          head = defaultMetas + headTags.meta + headTags.title + headTags.link;

          var initialState = _extends({}, store.getState(), {
            // only keep current page as others are not necessary
            pages: _defineProperty({}, url, store.getState().pages[url])
          });
          script = "window.__COLLECTION__ = " + (0, _escapeJsonForHtml2.default)(JSON.stringify(collectionMin)) + ";" + ("window.__INITIAL_STATE__ = " + (0, _escapeJsonForHtml2.default)(JSON.stringify(initialState)));
        }
        var scriptTags = false;
        if (assetsFiles.js && Array.isArray(assetsFiles.js)) {
          scriptTags = assetsFiles.js.map(function (fileName) {
            return _react2.default.createElement("script", {
              key: fileName,
              src: "" + (0, _joinUri2.default)(baseUrl.pathname, fileName)
            });
          });
        }
        // Add appcache manifest to html tag
        var manifest = appcache && appcache !== "" ? (0, _joinUri2.default)(baseUrl.pathname, "manifest.appcache") : "";
        // write htmlString as html files
        return resolve(
        // render html document as simple html
        "<!doctype html>" + _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, {
          head: head,
          body: body,
          script: script,
          manifest: manifest,
          children: scriptTags
        })));
      });
    } catch (err) {
      reject(err);
    }
  });
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _reactHelmet = require("react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _importExports2 = require("../../_utils/import-exports");

var _importExports3 = _interopRequireDefault(_importExports2);

var _htmlMetas = require("../../_utils/html-metas");

var _htmlMetas2 = _interopRequireDefault(_htmlMetas);

var _joinUri = require("../../_utils/join-uri");

var _joinUri2 = _interopRequireDefault(_joinUri);

var _Html = require("./Html");

var _Html2 = _interopRequireDefault(_Html);

var _ContextProvider = require("../../ContextProvider");

var _ContextProvider2 = _interopRequireDefault(_ContextProvider);

var _escapeJsonForHtml = require("../../_utils/escape-json-for-html");

var _escapeJsonForHtml2 = _interopRequireDefault(_escapeJsonForHtml);

var _minify = require("../../content-loader/minify");

var _minify2 = _interopRequireDefault(_minify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }