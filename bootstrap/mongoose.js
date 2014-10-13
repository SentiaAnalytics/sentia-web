'use strict';
var mongoose = require('mongoose'),
  logger = require('bragi'), 
  P = require('bluebird'),
  config = require('config'),
  connection;

module.exports = new P(function (resolve, reject) {
  console.log(config.mongo);
  connection = mongoose.connect(config.mongo).connection;

  connection.on('error', function (error) {
    console.log(config.mongo);
    logger.log('error:mongo', error);
    process.exit(1);
  });

  connection.once('open', function () {
    require('../models');
    return resolve();
  });
});


