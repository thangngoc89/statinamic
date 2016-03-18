"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var pkg = _ref.pkg;
  var config = _ref.config;
  var errors = _ref.errors;

  if (config.production) {
    process.env.NODE_ENV = "production";
    if (!pkg.homepage) {
      errors.push("Your package.json require a 'homepage' field.");
    }
  }
};