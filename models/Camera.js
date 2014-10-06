'use strict';
var mongoose = require('mongoose'),
  logger = require('bragi'),
  P = require('bluebird'),
  cameraSchema;

cameraSchema = mongoose.Schema({
  name : String,
  ip : String,
  store : mongoose.Schema.Types.ObjectId,
  company :  mongoose.Schema.Types.ObjectId
});
cameraSchema.methods.savep = function () {
  return new P(function (resolve, reject) {
    this.save(function (err) {
      if (err) {
        logger.log('debug:users', err);
        return reject(err);
      }
        logger.log('debug:users', 'Camera created');
        return resolve(this);
    });
  }.bind(this));
};
module.exports = mongoose.model('Camera', cameraSchema);
