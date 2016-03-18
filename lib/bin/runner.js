"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _child_process = require("child_process");

var _path = require("path");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var cwd = process.cwd();

exports.default = function (defaultOptions) {
  return function (argv) {
    // get real args, after the node script
    // by relying on yargs $0
    var realArgs = process.argv.slice(process.argv.indexOf(argv.$0) + 1);

    // get argv that are not recognized as command by yargs
    var args = realArgs.filter(function (arg) {
      return argv._.indexOf(arg) === -1;
    });

    var spawnArgs = [(0, _path.join)(__dirname, "runner-cmd.js"), (0, _path.join)(cwd, argv.script)].concat(_toConsumableArray(defaultOptions), _toConsumableArray(args));

    (0, _child_process.spawn)("node", spawnArgs, {
      stdio: "inherit",
      env: _extends({}, process.env, {
        BABEL_DISABLE_CACHE: process.env.BABEL_DISABLE_CACHE || 1,
        DEBUG: process.env.DEBUG || "statinamic:*",
        STATINAMIC_CONFIG: process.env.STATINAMIC_CONFIG || (0, _path.join)(cwd, argv.config)
      })
    })
    // close current process with spawned code
    // allow to exit(1) if spawned exited with 1
    .on("close", process.exit);
  };
};