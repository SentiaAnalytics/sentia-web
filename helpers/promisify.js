'use strict';

module.exports = function (f, that) {
  return function () {
    var args = R.slice(0, Infinity, arguments);
    return new Promise(function (resolve, reject) {
      var callback = function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      };
      f.apply(that, R.append(callback, args));
    });
  };
};
