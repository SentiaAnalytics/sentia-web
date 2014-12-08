'use strict';
var squel = require('squel'),
  db = require('./mysql'),
  models = require('../models'),
  E = require('express-http-errors'),
  P = require('bluebird'),
  objectId = require('mongoose').Types.ObjectId,
  moment = require('moment');
squel.useFlavour('mysql');

function log (data) {
  console.log(data);
  return data;
}

exports.find = function (query) {
  console.log(query);
  return P.resolve(query)
    .then(exports._getStore)
    .then(exports._buildPosQuery)
    .then(log)
    .then(db.query)
    .then(log)
    .catch(function (err) {
      console.log(err.stack);
      return P.reject(new E.InternalError('Database Error'));
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
  return squel.select()
    .field('hour(starttime) as hour')
    .field('sum(amount) as revenue')
    .field('sum(1) as transactions')
    .from('pos')
    .where('starttime < ?', query.to)
    .where('starttime >= ?', query.from)
    .where('store = ?', query.dataId)
    .where("type = 'Payment'")
    .group('hour')
    .toString();
};

