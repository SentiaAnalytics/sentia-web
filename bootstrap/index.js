'use strict';
var lo = require('lodash'),
  bootstrap = require('requireindex')(__dirname),
  P = require('bluebird');

// graps all the values of bootstrap (all the exported functions)
// then builds a promise chain of the one at a time
function chainPromises () {
  return lo.values(bootstrap).reduce(function (promise, func) {
    if (typeof func === 'function') {

      return promise.then(func);
    }
    return promise;
  },P.resolve());
}
module.exports = function () {

    return chainPromises()
      .then(function () {
        // we dont want to resolve with a value
      });
};
