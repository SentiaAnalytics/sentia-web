'use strict';
var mongoose = require('mongoose'),
  logger = require('bragi'),
  P = require('bluebird'),
  bcrypt = require('../services/bcrypt'),
  UserSchema;

UserSchema = mongoose.Schema({
  email : {
    type : String,
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
        logger.log('debug:users', err);
        return reject(err);
      }
        logger.log('debug:users', 'User created');
        return resolve(this);
    });
  }.bind(this));
};

UserSchema.methods.authenticate = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
