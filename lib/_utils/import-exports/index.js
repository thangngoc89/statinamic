"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = importExports;
function importExports(exportPaths) {
  var exports = {};
  Object.keys(exportPaths).forEach(function (t) {
    if (typeof exportPaths[t] !== "string") {
      throw new Error("You should only pass file paths as 'exports'. " + ("You provided: " + _typeof(exportPaths[t]) + "."));
    }

    var a = require(exportPaths[t]);

    // handy thing for babel default try
    if (a.hasOwnProperty("__esModule") && a.hasOwnProperty("default")) {
      a = a.default;
    }

    exports[t] = a;
  });

  return exports;
}