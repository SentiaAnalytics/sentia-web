'use strict';
var client = require('mongodb').MongoClient;
var config = require('config');
module.exports = new Promise(function (resolve, reject) {
    client.connect(config.mongo, function (err, db) {
        if (err) {
          return reject(err);
        }
        return resolve(db);
    });
});

// promisify find
exports.find = function (query) {
  return new Promise(function (resolve, reject) {

    this.find(query)
      .toArray(function (err, result) {
          if(err) {
            return reject(err);
          }
          return resolve(result);
      });
  });
};

// promisify find
exports.findOne = function (query) {
  return new Promise(function (resolve, reject) {

    this.findOne(query, function (err, result) {
      if(err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
