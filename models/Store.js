'use strict';
var mongoose = require('mongoose'),
  StoreSchema;

StoreSchema = mongoose.Schema({
  name : String,
  company :  mongoose.Schema.Types.ObjectId,
  dataId : String,
  floors : Array
});
StoreSchema.methods.savep = function () {
  return new Promise(function (resolve, reject) {
    this.save(function (err) {
      if (err) {
        return reject(err);
      }
        return resolve(this);
    });
  }.bind(this));
};
module.exports = mongoose.model('Store', StoreSchema);
