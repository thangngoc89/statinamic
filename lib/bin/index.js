#!/usr/bin/env node
"use strict";

// still in src/, handy to play
if (__filename.indexOf("statinamic/src") > 1) {
  require("babel-register");
}

require("./statinamic.js");