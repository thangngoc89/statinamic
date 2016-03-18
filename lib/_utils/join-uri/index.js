"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var joinUri = function joinUri() {
  return _path.sep === "/"
  // unix
  ? _path.join.apply(undefined, arguments)
  // windows require replacement of \ to /
  : _path.join.apply(undefined, arguments).replace(/\\/g, "/");
};

exports.default = joinUri;