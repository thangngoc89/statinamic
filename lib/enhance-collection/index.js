"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = enhanceCollection;
exports.filter = filter;
exports.sort = sort;
exports.reverse = reverse;
exports.limit = limit;
exports.addSiblingReferences = addSiblingReferences;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function enhanceCollection(collection, options) {
  var console = arguments.length <= 2 || arguments[2] === undefined ? console : arguments[2];

  options = _extends({}, options);

  if (options.filter) {
    collection = filter(collection, [options.filter], console);
  }

  if (options.filters) {
    collection = filter(collection, options.filters, console);
  }

  if (options.sort) {
    collection = sort(collection, options.sort);
  }

  if (options.reverse) {
    collection = reverse(collection);
  }

  if (options.limit) {
    collection = limit(collection, options.limit);
  }

  if (options.addSiblingReferences) {
    collection = addSiblingReferences(collection);
  }

  return collection;
}

function filter(collection, filters) {
  var console = arguments.length <= 2 || arguments[2] === undefined ? console : arguments[2];

  return collection.reduce(function (acc, item) {
    var include = true;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var filter = _step.value;

        switch (typeof filter === "undefined" ? "undefined" : _typeof(filter)) {
          case "function":
            {
              var flag = filter(item);
              if (typeof flag !== "boolean") {
                console.warn("Function passed to filter item in 'enhanceCollection' should " + "return a boolean value. \n" + ("You returned '" + (typeof flag === "undefined" ? "undefined" : _typeof(flag)) + "'."));
              }
              if (!flag) {
                include = false;
              }
              break;
            }
          case "object":
            {
              var keys = Object.keys(filter);
              if (!keys.reduce(function (acc, key) {
                return acc && (typeof filter[key] === "string" && item[key] === filter[key] || filter[key] instanceof RegExp && item[key] && item[key].match(filter[key]));
              }, true)) {
                include = false;
              }
              break;
            }
          case "string":
          default:
            if (!item[filter]) {
              include = false;
            }
            break;
        }

        // break asap
        if (!include) {
          return "break";
        }
      };

      for (var _iterator = filters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ret = _loop();

        if (_ret === "break") break;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (include) {
      acc.push(item);
    }

    return acc;
  }, []);
}

function sort(collection) {
  var sort = arguments.length <= 1 || arguments[1] === undefined ? "date" : arguments[1];

  collection = [].concat(_toConsumableArray(collection));

  if (typeof sort === "function") {
    collection.sort(sort);
  } else {
    collection.sort(function (a, b) {
      a = a[sort];
      b = b[sort];
      if (!a && !b) return 0;
      if (!a) return -1;
      if (!b) return 1;
      if (b > a) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  return collection;
}

function reverse(collection) {
  collection = [].concat(_toConsumableArray(collection));
  collection.reverse();
  return collection;
}

function limit(collection, limit) {
  return collection.slice(0, limit);
}

function addSiblingReferences(collection) {
  var last = collection.length - 1;
  // TODO: Use commented code when flow can understand it
  // return collection.map((item, i) => ({
  //   ...item,
  //   ...(0 != i) && { previous: collection[i-1] },
  //   ...(last != i) && { next: collection[i+1] },
  // }))
  return collection.map(function (item, i) {
    var newItem = _extends({}, item);
    if (0 != i) {
      newItem.previous = collection[i - 1];
    }
    if (last != i) {
      newItem.next = collection[i + 1];
    }

    return newItem;
  });
}