"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (root, cb) {
  root.addEventListener("click", function (ev) {
    if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.defaultPrevented) {
      return true;
    }

    var anchor = null;
    for (var n = ev.target; n.parentNode; n = n.parentNode) {
      if (n.nodeName === "A") {
        anchor = n;
        break;
      }
    }
    if (!anchor) return true;
    var href = anchor.getAttribute("href");

    // Don't intercerpt anchor
    if (href.startsWith("#")) {
      return true;
    }

    var u = _url2.default.parse(href);

    if (u.host && u.host !== window.location.host) {
      return true;
    }

    var finalUrl = _url2.default.resolve(window.location.pathname, u.path || "") + (u.hash || "");

    if (!cb(finalUrl)) {
      return true;
    }

    ev.preventDefault();
    return false;
  });
};

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }