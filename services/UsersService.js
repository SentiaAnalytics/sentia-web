'use strict';
var P = require('bluebird'),
  lodash = require('lodash'),
  logger = require('bragi'),
  models = require('../models'),
  bcrypt = require('./bcrypt'),
  E = require('express-http-errors');

exports.create = function (query) {
  return bcrypt.hash(query.password)
    .then(lodash.partial(exports._createUser, query))
    .catch(exports._createError);
};
exports._createUser = function (user, passwordHash) {
  user.password = passwordHash;
  return models.User.create(user);
};
exports._createError = function (err) {
  console.log(err);
  logger.log('debug:users', 'ERROR' + err);

  if (err.email) {
    throw new E.BadRequestError('Invalid Email');
  }
  if (err.message && err.message.indexOf('duplicate key') !== -1) {
    throw new E.BadRequestError('A user with that email already exists');
  }
  throw new Error(err);
};


exports.find = function (query) {
  return P.resolve(query)
    .then(exports._buildFindQuery)
    .then(exports._findUsers);
};
exports._findUsers = function (query) {
  console.log('query');
  console.log(query);
  return models.User.findAll(query)
    .then(function (users) {
      return users;
    })
    .catch(function (err) {
      throw new E.BadRequstError('err');
    });
};

exports._buildFindQuery = function (query) {
  return {
    where : {
      CompanyId : query.CompanyId
    }
  };
};




