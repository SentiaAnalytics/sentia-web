'use strict';
var mongoose = require('mongoose'),
  P = require('bluebird'),
  CompanySchema;

CompanySchema = mongoose.Schema({
  name : String
});

CompanySchema.methods.savep = function () {
  return new P(function (resolve, reject) {
    this.save(function (err) {
      if (err) {
        return reject(err);
      }
        return resolve(this);
    });
  }.bind(this));
};

module.exports = mongoose.model('Company', CompanySchema);
