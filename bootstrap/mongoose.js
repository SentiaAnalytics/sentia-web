'use strict';
var mongoose = require('mongoose'),
  P = require('bluebird'),
  config = require('config'),
  connection;

mongoose.Promise.prototype.catch = function (func) {
  return this.then(null, func);
};
module.exports = new P(function (resolve, reject) {
  connection = mongoose.connect(config.mongo).connection;

  connection.on('error', function (error) {
    logger.log('error', 'mongoose', error);
    process.exit(1);
  });

  connection.once('open', function () {
    require('../models');
    return resolve();
  });
});
