'use strict';
var when = require('when'),
  squel = require('squel'),
  E = require('express-http-errors'),
  db = require('./postgres');

exports.read = function (query) {
  return when(query)
    .then(this._buildGetQuery)
    .then(db.query)
    .then(this._sanitizeUsers)
    .then(this._getFirstElement);
};


exports.find = function (query) {
  return when(query)
    .then(this._buildGetQuery)
    .then(db.query)
    .then(this._sanitizeUsers);
};


exports._getFirstElement = function (data) {
  if (data.lenth === 0) {
    throw new E.NotFoundError('User does not exist');
  }

  return data[0];
};

exports._sanitizeUsers = function (users) {
  return users.map(function (user) {
    delete user.password;
    return user;
  });
};

exports._buildGetQuery = function (query) {
  var q = squel.select()
    .from('"user"')
    .where ('company = ?', query.company)
    .limit(query.limit || 0)
    .offset(query.skip || 0);

  if (query.hasOwnProperty('id')) {
    q.where('id = ?', query.id);
  }

  if (query.hasOwnProperty('order')) {
    q.order(query.order, !(query.desc)); // order takes ASC as a boolean second arg
  }

  return q.toString();

};
