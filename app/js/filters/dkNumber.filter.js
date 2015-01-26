'use strict';
module.exports = function () {
  return function(input, decimals) {
    if (Number.isNaN(Number(input))) {
      return input;
    }
    decimals = decimals || 2;
    var i = Math.pow(10, decimals);
    return Math.round(input * i) / i;
  };
};
