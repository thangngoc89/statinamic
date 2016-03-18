"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require("loader-utils");

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _grayMatter = require("gray-matter");

var _grayMatter2 = _interopRequireDefault(_grayMatter);

var _joinUri = require("../_utils/join-uri");

var _joinUri2 = _interopRequireDefault(_joinUri);

var _urlify = require("../_utils/urlify");

var _urlify2 = _interopRequireDefault(_urlify);

var _enhanceCollection = require("../enhance-collection");

var _enhanceCollection2 = _interopRequireDefault(_enhanceCollection);

var _feed = require("./feed");

var _feed2 = _interopRequireDefault(_feed);

var _cache = require("./cache");

var _cache2 = _interopRequireDefault(_cache);

var _description = require("./description");

var _description2 = _interopRequireDefault(_description);

var _validator = require("./validator");

var _validator2 = _interopRequireDefault(_validator);

var _defaultRenderer = require("./default-renderer");

var _defaultRenderer2 = _interopRequireDefault(_defaultRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeout = void 0;

module.exports = function (input) {
  var _this = this;

  var query = _loaderUtils2.default.parseQuery(this.query);

  try {
    (0, _validator2.default)(query);
  } catch (err) {
    this.emitError(err);
  }

  var context = query.context || this.options.context;
  var renderer = query.renderer || _defaultRenderer2.default;

  var defaultHead = query.defaultHead;
  var parsed = (0, _grayMatter2.default)(input);

  var relativePath = _path2.default.relative(context, this.resourcePath);
  var tmpUrl = (0, _urlify2.default)(parsed.data.route
  // custom route
  ? parsed.data.route
  // default route
  : relativePath);

  var url = (0, _urlify2.default)(tmpUrl);
  var resourceUrl = (0, _urlify2.default)(tmpUrl, true);

  var hash = _loaderUtils2.default.getHashDigest(input);
  var dataUrl = resourceUrl + "." + hash + ".json";

  var metadata = {
    __filename: relativePath,
    __url: (0, _joinUri2.default)("/", url),
    __resourceUrl: (0, _joinUri2.default)("/", resourceUrl),
    __dataUrl: (0, _joinUri2.default)("/", dataUrl)
  };
  var textData = _extends({
    head: _extends({}, defaultHead, parsed.data),
    body: renderer(parsed.content),
    rawBody: parsed.content,
    raw: parsed.orig
  }, metadata);

  textData = (0, _description2.default)(textData, query.description);

  if (!this.emitFile) {
    throw new Error("emitFile is required from module system");
  }

  // emit file
  this.emitFile(dataUrl, JSON.stringify(textData));

  // update collection
  // replace or add depending on the cache state
  var previousIndex = void 0;
  _cache2.default.forEach(function (md, index) {
    if (md.__filename === relativePath) {
      previousIndex = index;
    }
  });
  if (previousIndex) {
    _cache2.default[previousIndex] = textData;
  } else {
    _cache2.default.push(textData);
  }

  if (timeout) {
    clearTimeout(timeout);
  } else {
    setTimeout(function () {
      // emit updated feeds
      var feeds = query.feeds || [];
      var feedsOptions = query.feedsOptions || {};
      Object.keys(feeds).forEach(function (name) {
        var _feeds$name = feeds[name];
        var feedOptions = _feeds$name.feedOptions;
        var collectionOptions = _feeds$name.collectionOptions;

        _this.emitFile(name, (0, _feed2.default)({
          feedOptions: _extends({}, feedsOptions, feedOptions),
          destination: name,
          collection: (0, _enhanceCollection2.default)(_cache2.default.map(function (item) {
            return _extends({}, item.head, {
              description: item.body,
              __url: item.__url
            });
          }), collectionOptions)
        }));
      });
    }, 100);
  }

  return "module.exports = " + JSON.stringify((0, _joinUri2.default)("/", dataUrl));
};