'use strict';
var squel = require('squel'),
  db = require('./mysql'),
  models = require('../models'),
  E = require('express-http-errors'),
  P = require('bluebird'),
  objectId = require('mongoose').Types.ObjectId,
  moment = require('moment');
squel.useFlavour('mysql');

exports.find = function (query) {
  return P.resolve(query)
    .then(exports._getStore)
    .then(exports._buildPosQuery)
    .then(function (query) {
      return query;
    })
    .then(db.query)
    .catch(function (err) {
      console.log(err.stack);

    });
};
exports._getStore = function (query) {
  return models.Store.findOne({_id : objectId(query.store), company : query.company})
    .exec()
    .then(function (store) {
      console.log('store');
      console.log(store);
      if (!store) {
        return P.reject(new E.BadRequestError('Store does not exist'));
      }
      query.dataId = store.toObject().dataId;
      return query;
    });
};
exports._buildPosQuery = function (query) {
  console.log(query);
  return squel.select()
    .from('pos')
    .where('starttime < ?', query.to)
    .where('starttime >= ?', query.from)
    .where('store = ?', query.dataId)
    .toString();
};
