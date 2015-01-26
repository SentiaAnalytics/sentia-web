'use strict';
var mongoose = require('mongoose'),
  logger = require('bragi'),
  P = require('bluebird'),
  CompanySchema;

CompanySchema = mongoose.Schema({
  name : String
});

CompanySchema.methods.savep = function () {
  return new P(function (resolve, reject) {
    this.save(function (err) {
      if (err) {
        logger.log('debug:users', err);
        return reject(err);
      }
        logger.log('debug:users', 'User created');
        return resolve(this);
    });
  }.bind(this));
};

module.exports = mongoose.model('Company', CompanySchema);
