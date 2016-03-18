"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTestAnswers = undefined;

var _validUrl = require("valid-url");

var _validUrl2 = _interopRequireDefault(_validUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTestAnswers = exports.defaultTestAnswers = {
  name: "Statinamic",
  homepage: "http://moox.io/statinamic/",
  CNAME: false
};

var questions = [{
  type: "input",
  name: "name",
  message: "Name of your project",
  validate: function validate(value) {
    var pass = /^[a-zA-Z0-9\-]+$/.test(value);
    if (pass) {
      return true;
    }
    return "Project name must contains only letters, numbers and dashes";
  }
}, {
  type: "input",
  name: "homepage",
  message: "Homepage url for your website",
  validate: function validate(value) {
    if (_validUrl2.default.isWebUri(value)) {
      return true;
    }
    return "Please provide a valid url";
  }
}, {
  type: "confirm",
  name: "CNAME",
  message: "Should statinamic generate a CNAME file ?",
  default: false
}];

exports.default = questions;