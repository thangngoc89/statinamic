"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = description;

var _remark = require("remark");

var _remark2 = _interopRequireDefault(_remark);

var _stripMarkdown = require("strip-markdown");

var _stripMarkdown2 = _interopRequireDefault(_stripMarkdown);

var _underscore = require("underscore.string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOpts = {
  pruneLength: 140,
  pruneString: "…"
};

function description(mdObject) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  opts = _extends({}, defaultOpts, opts);

  if (opts.pruneLength < 10) {
    console.warn("You defined 'description.pruneLength' of content-loader " + "with an zero value. This does not make sense, " + ("so the default value " + defaultOpts.pruneLength + " has been used."));

    opts.pruneLength = defaultOpts.pruneLength;
  }

  // Don't touch mdObject if there is a
  // description field in frontmatter
  if (mdObject.head.description) {
    return mdObject;
  }

  var description = _remark2.default.use(_stripMarkdown2.default).process(mdObject.rawBody);

  description = (0, _underscore.prune)(description, opts.pruneLength, opts.pruneString);

  description = description && description.length > 0 ? description : null;

  return _extends({}, mdObject, {
    head: _extends({}, mdObject.head, {
      description: description
    })
  });
}