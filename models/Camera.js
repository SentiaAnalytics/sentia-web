'use strict';
var mongoose = require('mongoose'),
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
        return reject(err);
      }
        return resolve(this);
    });
  }.bind(this));
};

module.exports = mongoose.model('Camera', cameraSchema);
