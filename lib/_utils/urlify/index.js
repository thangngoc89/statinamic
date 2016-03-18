"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileExtensionRE = undefined;
exports.default = urlify;

var _joinUri = require("../join-uri");

var _joinUri2 = _interopRequireDefault(_joinUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileExtensionRE = exports.fileExtensionRE = /\.html?$/;

function urlify(string) {
  var full = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var hasExtension = string.match(fileExtensionRE);

  var url = string;

  // replace windows backslash by slash
  // before playing more with the url
  url = url.replace(/\\/g, "/");

  url = url
  // something/index.md => something
  .replace(/\bindex\.md$/, "")
  // something-else.md => something-else
  .replace(/\.md$/, "");

  // if url is not and html file, we will tweak it a little bit depending on the
  // length wanted (full url or folder url)
  if (!hasExtension) {
    if (full) {
      // url without extension => folder => index.html
      url = (0, _joinUri2.default)(url, "index.html");
    } else {
      // url without extension => folder
      if (url.length && !url.endsWith("/")) {
        url += "/";
      }
    }
  }
  // else, url with a file extension, don't touch

  // no relative url
  url = url.replace(/^\.\//, "");

  return url;
}