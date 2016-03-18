"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require("babel-polyfill");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require("path");

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _inquirer = require("../utils/inquirer");

var _questions = require("../data/questions");

var _questions2 = _interopRequireDefault(_questions);

var _template = require("../data/template");

var _template2 = _interopRequireDefault(_template);

var _package = require("../../../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(argv) {
    var cwd, answers, testMode, _answers, name, homepage, statinamic, devDependencies, pkg, boilerplatePath;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cwd = process.cwd();
            _context.prev = 1;
            answers = void 0;
            testMode = argv.test;

            if (!testMode) {
              _context.next = 8;
              break;
            }

            answers = _questions.defaultTestAnswers;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return (0, _inquirer.prompt)(_questions2.default);

          case 10:
            answers = _context.sent;

          case 11:
            _answers = answers;
            name = _answers.name;
            homepage = _answers.homepage;
            statinamic = _objectWithoutProperties(_answers, ["name", "homepage"]);
            devDependencies = _extends({}, _package.peerDependencies, _package.optionalPeerDependencies, !testMode && {
              statinamic: "^" + _package.version
            });
            pkg = _extends({}, _template2.default, {
              name: name,
              homepage: homepage,
              statinamic: statinamic,
              devDependencies: devDependencies
            });


            _fsExtra2.default.writeJsonSync((0, _path.join)(cwd, "package.json"), pkg);
            console.log(_chalk2.default.green("Generated package.json file"));

            boilerplatePath = (0, _path.join)(__dirname, "../../../boilerplate");

            _fsExtra2.default.copySync(boilerplatePath, cwd);
            console.log(_chalk2.default.green("Copied boilerplate"));

            console.log(_chalk2.default.green("Setup done. Now run \"npm install\" to get started"));
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](1);

            console.error(_chalk2.default.red(_context.t0));
            process.exit(1);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 25]]);
  }));

  function setup(_x) {
    return ref.apply(this, arguments);
  }

  return setup;
}();