'use strict';
module.exports = function filterFunction () {
  return function(input) {
    if (isValidNumber(input)) {
      return input;
    }
    return ' ... ';
  };
};

function isValidNumber (input) {
  return typeof input === 'number' && !isNaN(input);
}
