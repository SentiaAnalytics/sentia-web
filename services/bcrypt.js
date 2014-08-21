'use strict';
var bcrypt = require('bcrypt'),
  when = require('when');

exports.hash = function (password) {
  return when.promise(function (resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          return reject(err);
        }
        return resolve(hash);
      });
    });
  });
};
exports.compare =  function (password, hash) {
  return when.promise(function (resolve, reject) {
    bcrypt.compare(password, hash, function(err, res) {
      if (res === true) {
        return resolve(true);
      }
      return reject('Invalid Password');
    });
  });
};
