"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setPageData = setPageData;
exports.forgetPageData = forgetPageData;
exports.writeHTMLFile = writeHTMLFile;
exports.writeAllHTMLFiles = writeAllHTMLFiles;

exports.default = function (options, testing) {
  return writeAllHTMLFiles(_extends({}, options, {
    setPageData: setPageData,
    forgetPageData: forgetPageData,
    writeHTMLFile: writeHTMLFile
  }), testing);
};

var _fsPromise = require("fs-promise");

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _urlAsHtml = require("./url-as-html");

var _urlAsHtml2 = _interopRequireDefault(_urlAsHtml);

var _pages = require("../../redux/modules/pages");

var pagesActions = _interopRequireWildcard(_pages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (pagesActions.SET === undefined) {
  throw new Error("pages SET action is undefined");
}
if (pagesActions.FORGET === undefined) {
  throw new Error("pages FORGET action is undefined");
}

var log = (0, _debug2.default)("statinamic:static:to-html");

function setPageData(url, collection, store) {
  var json = collection.find(function (item) {
    return item.__url === url;
  });
  if (!json) {
    log("No json in for url '" + url + "'.");
  } else {
    // prepare page data
    store.dispatch({
      type: pagesActions.SET,
      page: url,
      response: { json: json }
    });
  }
}

function forgetPageData(url, store) {
  // forget page data to avoid having all pages data in all
  // pages
  store.dispatch({
    type: pagesActions.FORGET,
    page: url
  });
}

function writeHTMLFile(filename, html) {
  return _fsPromise2.default.mkdirs(_path2.default.dirname(filename)).then(function () {
    return Promise.all([_fsPromise2.default.writeFile(filename, html)]);
  }).then(function () {
    return filename;
  });
}

function writeAllHTMLFiles(_ref, testing) {
  var urls = _ref.urls;
  var baseUrl = _ref.baseUrl;
  var destination = _ref.destination;
  var assetsFiles = _ref.assetsFiles;
  var exports = _ref.exports;
  var collection = _ref.collection;
  var store = _ref.store;
  var setPageData = _ref.setPageData;
  var forgetPageData = _ref.forgetPageData;
  var writeHTMLFile = _ref.writeHTMLFile;
  var appcache = _ref.appcache;

  // create all html files
  return Promise.all(urls.map(function (url) {
    var item = collection.find(function (item) {
      return item.__url === url;
    });
    var filename = item ? _path2.default.join(destination, item.__resourceUrl) : _path2.default.join(destination, url);

    setPageData(url, collection, store);
    return (0, _urlAsHtml2.default)(url, {
      exports: exports,
      collection: collection,
      store: store,

      baseUrl: baseUrl,
      assetsFiles: assetsFiles,
      appcache: appcache
    }, testing).then(function (html) {
      return writeHTMLFile(filename, html);
    }).then(function () {
      return forgetPageData(url, store);
    });
  }));
}