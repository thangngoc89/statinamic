"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _remark = require("remark");

var _remark2 = _interopRequireDefault(_remark);

var _remarkSlug = require("remark-slug");

var _remarkSlug2 = _interopRequireDefault(_remarkSlug);

var _remarkAutolinkHeadings = require("remark-autolink-headings");

var _remarkAutolinkHeadings2 = _interopRequireDefault(_remarkAutolinkHeadings);

var _remarkHighlight = require("remark-highlight.js");

var _remarkHighlight2 = _interopRequireDefault(_remarkHighlight);

var _remarkHtml = require("remark-html");

var _remarkHtml2 = _interopRequireDefault(_remarkHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (text) {
  return _remark2.default
  // https://github.com/wooorm/remark-slug
  .use(_remarkSlug2.default)

  // https://github.com/ben-eb/remark-autolink-headings
  .use(_remarkAutolinkHeadings2.default, {
    attributes: {
      class: "statinamic-HeadingAnchor"
    },
    template: "#"
  })

  // https://github.com/wooorm/remark-html
  .use(_remarkHtml2.default, { entities: "escape" })

  // https://github.com/ben-eb/remark-highlight.js
  .use(_remarkHighlight2.default)

  // render
  .process(text, {
    commonmark: true
  });
};