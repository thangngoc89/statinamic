"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cleanNodeCache;

var _path = require("path");

function cleanNodeCache(dir) {
  Object.keys(require.cache).filter(function (t) {
    return t.startsWith(dir) && !t.startsWith((0, _path.join)(dir, "node_modules"));
  }).forEach(function (t) {
    delete require.cache[t];
  });
}