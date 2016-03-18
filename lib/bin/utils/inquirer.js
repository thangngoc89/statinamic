"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prompt = undefined;

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prompt = exports.prompt = function prompt(questions) {
  return new Promise(function (resolve) {
    _inquirer2.default.prompt(questions, function (answers) {
      return resolve(answers);
    });
  });
};