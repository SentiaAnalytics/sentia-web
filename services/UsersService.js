'use strict';
var when = require('when'),
  lo = require('lodash'),
  models = require('../models'),
  E = require('express-http-errors');

exports.read = function (query) {
  return when(query)
    .then(this._buildGetQuery)
    .then(models.User.find)
    .then(this._sanitizeUsers)
};


exports.find = function (query) {
  return when(query)
    .then(this._buildGetQuery)
    .then(models.User.find)
    .then(this._sanitizeUsers);
};


exports._getFirstElement = function (data) {
  if (data.lenth === 0) {
    throw new E.NotFoundError('User does not exist');
  }

  return data[0];
};

exports._sanitizeUsers = function (users) {
  if (Array.isArray(users)) {
    return users.map(function (user) {
      delete user.password;
      return user;
    });
  }
  delete users.password
  return users;


};

exports._buildGetQuery = function (query) {
  var sequelizeQuery = {
    where : lo.omit(query, ['limit', 'sort', 'skip']),
    limit : query.limit || 0,
    offset : query.skip || 0,
  };

  if (query.sort) {
    sequelizeQuery.order = query.sort
  }
  return sequelizeQuery;
};
