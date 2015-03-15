'use strict';
var mongo = require('../services/mongo.service');

var Collection = module.exports = function(name) {
  var self = this;
  self.name = name;

};

Collection.prototype.getCollection = function() {
  var self = this;
  return mongo
    .then(function(db) {
      return db.collection(self.name);
    });
};

Collection.prototype.find = function(query) {
  var self = this;
  return self.getCollection()
    .then(function(collection) {
      return new Promise(function(resolve, reject) {
        self.find(query)
          .toArray(function(err, result) {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          });
      });
    })
    .then(function (results) {
        return results.map(self.toJSON);
    });
};

Collection.prototype.findOne = function(query) {
  var self = this;
  return self.getCollection()
    .then(function(collection) {
      return new Promise(function(resolve, reject) {
        self.findOne(query, function(err, result) {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    })
    .then(self.toJSON);
};

Collection.prototype.toJSON = function(data) {
  return data;
};
