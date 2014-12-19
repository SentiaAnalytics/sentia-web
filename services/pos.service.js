'use strict';
var j2sql = require('json2sql'),
  db = require('./mysql.service'),
  log = require('bragi').log,
  models = require('../models'),
  E = require('express-http-errors'),
  P = require('bluebird'),
  objectId = require('mongoose').Types.ObjectId,
  moment = require('moment');

function Plogg (data) {
  log('pos.service:debug:log', data);
  return data;
}

exports.find = function (query, company) {
  return P.resolve(query)
    .then(exports._before(company))
    .then(j2sql.select)
    .then(Plogg)
    .then(db.query)
    .then(Plogg)
    .catch(function (err) {
      log('error:service:pos', err.stack);
      return P.reject(new E.InternalError('Database Error'));
    });
};
exports._before = function (company) {
  return function (query) {
    query.from = 'pos';
    return P.resolve(query)
      .then(exports._setStore(company))
  }
}
exports._setStore = function (company) {
  return function (query) {
    log('pos.service:debug:query', query.where.store);
    log('pos.service:debug:company', company);
    return models.Store.findOne({_id : objectId(query.where.store), company : objectId(company)})
      .exec()
      .then(function (store) {
        log('pos.service:debug:store', store);
        if (!store) {
          return P.reject(new E.BadRequestError('Store does not exist'));
        }
        log('stuff', 'what!')
        query.where.store = store.toObject().dataId;
        return query;
      });
  }
};

