'use strict';
var R = require('ramda'),
  bootstrap = require('requireindex')(__dirname),
  P = require('bluebird');

// graps all the values of bootstrap (all the exported functions)
// then builds a promise chain of the one at a time
module.exports = function () {

    return chainPromises()
      .then(function () {
        // we dont want to resolve with a value
      });
};

function chainPromises () {
  return R.pipe(
    R.values,
    R.reduce(chain, P.resolve())
  )(bootstrap);

  function chain (promise, func) {
    if (typeof func === 'function') {
      return promise.then(func);
    }
    return promise;
  }
}
