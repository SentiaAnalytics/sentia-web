'use strict';
module.exports = function filterFunction () {
  return function(input) {
    if (input === undefined || input === null) {
      return ' ... ';
    }
    return input;
  };
};
