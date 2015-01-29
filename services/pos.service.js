'use strict';
var j2sql = require('json2sql'),
  db = require('./mysql.service'),
  log = require('bragi').log,
  models = require('../models'),
  HTTPError = require('node-http-error'),
  P = require('bluebird'),
  objectId = require('mongoose').Types.ObjectId,
  moment = require('moment');

function Plogg (data) {
  log('pos.service:debug:log', data);
  return data;
}

exports.find = function (query) {
  var company = query.where.company;
  delete query.where.company;

  return P.resolve(query)
    .then(setTable)
    .then(setStore.bind(this, company))
    .then(j2sql.select)
    .then(Plogg)
    .then(db.query)
    .then(Plogg)
    .catch(function (err) {
      log('error:service:pos', err.stack);
      return P.reject(new HTTPError(500, 'Database Error'));
    });
};
function setTable (query) {
  query.from = 'pos';
  return query;
}

function setStore (company, query) {
  return models.Store.findOne({_id : objectId(query.where.store), company : company})
      .exec()
      .then(function (store) {
        log('pos.service:debug:store', store);
        if (!store) {
          return P.reject(new HTTPError(400, 'Store does not exist'));
        }
        log('stuff', 'what!');
        query.where.store = store.toObject().dataId;
        return query;
      });
}
