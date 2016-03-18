"use strict";

var _yargs = require("../configurator/yargs.js");

var _yargs2 = _interopRequireDefault(_yargs);

var _runner = require("./runner.js");

var _runner2 = _interopRequireDefault(_runner);

var _setup = require("./commands/setup.js");

var _setup2 = _interopRequireDefault(_setup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startAndBuildOptions = {
  script: {
    default: "scripts/build.js"
  },
  config: {
    alias: "c",
    type: "string",
    describe: "Configuration file",
    default: "scripts/config.js"
  }
}; /* eslint-disable no-var */


_yargs2.default.command("setup", "setup a project", {
  test: {
    describe: "Test mode (don't use this option)."
  }
}, _setup2.default).command("start [script]", "start your project (server / development mode)", startAndBuildOptions, (0, _runner2.default)(["--dev", "--server", "--open"])).command("build [script]", "build your project (static / production mode)", startAndBuildOptions, (0, _runner2.default)(["--production", "--static"])).parse(process.argv);