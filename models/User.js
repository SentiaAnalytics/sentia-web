'use strict';
var mongoose = require('mongoose'),
  P = require('bluebird'),
  bcrypt = require('../services/bcrypt.service'),
  UserSchema;

UserSchema = mongoose.Schema({
  email : {
    type : String,
    unique : true,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  firstname : String,
  lastname : String,
  company : mongoose.Schema.Types.ObjectId
});

UserSchema.set('toJSON', {transform : function (doc, ret, options) {
  delete ret.password;
}});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password)
    .then(function (hash) {
      this.password = hash;
      return next();
    }.bind(this));
});

UserSchema.methods.savep = function () {
  return new P(function (resolve, reject) {
    this.save(function (err) {
      if (err) {
        return reject(err);
      }
        return resolve(this);
    });
  }.bind(this));
};

UserSchema.methods.authenticate = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
