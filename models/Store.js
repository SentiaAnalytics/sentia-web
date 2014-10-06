'use strict';
var mongoose = require('mongoose'),
  logger = require('bragi'),
  P = require('bluebird'),
  StoreSchema;

StoreSchema = mongoose.Schema({
  name : String,
  Company :  mongoose.Schema.Types.ObjectId
});
StoreSchema.methods.savep = function () {
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
module.exports = mongoose.model('Store', StoreSchema);
