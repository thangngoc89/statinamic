"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getItemOrContinue = getItemOrContinue;

var _path = require("path");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _webpack = require("webpack");

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require("webpack-dev-middleware");

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require("webpack-hot-middleware");

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackErrorNotification = require("webpack-error-notification");

var _webpackErrorNotification2 = _interopRequireDefault(_webpackErrorNotification);

var _opn = require("opn");

var _opn2 = _interopRequireDefault(_opn);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _cache = require("../content-loader/cache.js");

var _cache2 = _interopRequireDefault(_cache);

var _urlAsHtml = require("../static/to-html/url-as-html");

var _urlAsHtml2 = _interopRequireDefault(_urlAsHtml);

var _pages = require("../redux/modules/pages");

var pagesActions = _interopRequireWildcard(_pages);

var _cleanNodeCache = require("../_utils/clean-node-cache");

var _cleanNodeCache2 = _interopRequireDefault(_cleanNodeCache);

var _joinUri = require("../_utils/join-uri");

var _joinUri2 = _interopRequireDefault(_joinUri);

var _redboxRenderer = require("../_utils/redbox-renderer");

var _redboxRenderer2 = _interopRequireDefault(_redboxRenderer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var log = (0, _debug2.default)("statinamic:builder:server");

var firstRun = true;

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  options = _extends({
    noDevEntriesTest: /^tests/
  }, options);
  var _options = options;
  var config = _options.config;
  var webpackConfig = config.webpackConfigClient;


  if (!config.baseUrl) {
    throw new Error("You must provide a 'baseUrl' object that contains the following keys:" + "'href', 'port', 'hostname'. See https://nodejs.org/api/url.html");
  }

  var server = (0, _express2.default)();

  if (config.static && config.server) {
    server.use(config.baseUrl.pathname, _express2.default.static((0, _path.join)(config.cwd, config.destination)));
  } else {
    (function () {
      var devEntries = [require.resolve("webpack-hot-middleware/client")];

      var devConfig = _extends({}, webpackConfig, {
        // debug: true,
        // watch: true,
        // colors: true,
        entry: _extends({}, Object.keys(webpackConfig.entry).reduce(function (acc, key) {
          // some entries do not need extra stuff
          acc[key] = key.match(options.noDevEntriesTest) !== null ? webpackConfig.entry[key] : [].concat(devEntries, _toConsumableArray(Array.isArray(webpackConfig.entry[key]) ? webpackConfig.entry[key] : [webpackConfig.entry[key]]));
          return acc;
        }, {})),
        plugins: [].concat(_toConsumableArray(webpackConfig.plugins || []), _toConsumableArray(options.plugins || []), [new _webpack2.default.optimize.OccurenceOrderPlugin(), new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin(), new _webpackErrorNotification2.default()]),
        eslint: _extends({}, webpackConfig.eslint, {
          emitWarning: true
        })
      });

      // webpack requirements
      var webpackCompiler = (0, _webpack2.default)(devConfig);

      server.use((0, _webpackDevMiddleware2.default)(webpackCompiler, _extends({
        publicPath: webpackConfig.output.publicPath,
        noInfo: !config.verbose
      }, devConfig.devServer)));

      // HMR
      server.use((0, _webpackHotMiddleware2.default)(webpackCompiler));

      var entries = [];
      webpackCompiler.plugin("done", function (stats) {
        // reset entries
        entries = [];
        var namedChunks = stats.compilation.namedChunks;
        Object.keys(namedChunks).forEach(function (chunkName) {
          entries = [].concat(_toConsumableArray(entries), _toConsumableArray(namedChunks[chunkName].files.filter(function (file) {
            return !file.endsWith(".hot-update.js");
          })));
        });
      });

      // user static assets
      if (config.assets) {
        server.use(config.baseUrl.pathname + config.assets.route, _express2.default.static(config.assets.path));
      }

      // routing for the part we want (starting to the baseUrl pathname)
      var router = (0, _express.Router)();
      server.use(config.baseUrl.pathname, router);

      // webpack static ressources
      router.get("*", _express2.default.static(webpackConfig.output.path));

      // prerender pages when possible
      var memoryFs = webpackCompiler.outputFileSystem;
      router.get("*", function (req, res, next) {
        var item = getItemOrContinue(_cache2.default, config.baseUrl, req, res);

        // try 404.html if there is any
        if (!item) {
          req.url = "/404.html";
          item = getItemOrContinue(_cache2.default, config.baseUrl, req, res);
        }

        if (!item) {
          next();
          return;
        }
        var filepath = (0, _path.join)(config.cwd, config.destination, item.__dataUrl);
        var fileContent = memoryFs.readFileSync(filepath);
        var json = JSON.parse(fileContent.toString());

        options.store.dispatch({
          type: pagesActions.SET,
          page: item.__url,
          response: {
            json: json
          }
        });

        if (!firstRun) {
          (0, _cleanNodeCache2.default)(config.cwd);
        }
        firstRun = false;

        (0, _urlAsHtml2.default)(item.__url, {
          exports: options.exports,
          store: options.store,
          collection: _cache2.default,
          baseUrl: config.baseUrl,
          assetsFiles: {
            js: entries,
            css: !config.dev
          }
        }).then(function (html) {
          res.setHeader("Content-Type", "text/html");
          res.end(html);
        }).catch(function (err) {
          log(err);
          res.setHeader("Content-Type", "text/html");
          res.end((0, _redboxRenderer2.default)(err));
        });
      });
    })();
  }

  // THAT'S IT
  var devHost = config.devHost;
  var devPort = config.devPort;


  server.listen(devPort, devHost, function (err) {
    if (err) {
      log(err);

      return;
    }
    var href = "http://" + devHost + ":" + devPort + config.baseUrl.pathname;
    log("Dev server started on " + href);
    if (config.open) {
      (0, _opn2.default)(href.replace(devHost, "localhost"));
    }
  });
};

function getItemOrContinue(collection, baseUrl, req, res) {
  var __url = req.url.replace(/index\.html$/, "");
  var item = collection.find(function (item) {
    return item.__url === __url;
  });
  if (!item) {
    var _ret2 = function () {
      log("%s not found", __url);
      var folderUrl = __url + "/";
      if (collection.find(function (item) {
        return item.__url === folderUrl;
      })) {
        var newUrl = req.url + "/";
        log("Redirecting to %s", newUrl);
        res.redirect((0, _joinUri2.default)(baseUrl.pathname, newUrl));
      }
      return {
        v: false
      };
    }();

    if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
  }

  return item;
}