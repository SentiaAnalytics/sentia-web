'use strict';
var mongo = require('simple-mongo'),
  config = require('config');
module.exports = function () {
  return mongo.connect(config.mongo)
    .then(function (mongo) {
      console.log('Connected to MongoDB');
      return mongo;
    });
};
