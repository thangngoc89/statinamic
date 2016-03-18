"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (_ref) {
  var config = _ref.config;
  var errors = _ref.errors;

  if (typeof config.appcache === "string") {
    config.appcache = [config.appcache];
  }
  // Default value if set true
  else if (typeof config.appcache === "boolean" && config.appcache) {
      config.appcache = ["**/*.*", "!**/*.html", "index.html"];
    }
    // not sure why yet, but yargs send "undefined", if an option as default to
    // false with not defined type
    else if (config.appcache === null || config.appcache === undefined) {
        config.appcache = false;
      } else if (!Array.isArray(config.appcache) && typeof config.appcache !== "boolean") {
        errors.push("You provided an '" + _typeof(config.appcache) + "' for 'appcache' option. " + "This option accepts a boolean value, a string, or an array.");
      }

  // Disable appcache for development
  if (config.dev) {
    config.appcache = false;
  }
};