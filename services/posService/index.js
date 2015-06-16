'use strict';
var j2sql = require('json2sql'),
  db = require('../mysql.service'),
  models = require('../../models'),
  HTTPError = require('node-http-error'),
  P = require('bluebird'),
  objectId = require('mongoose').Types.ObjectId,
  moment = require('moment');


exports.get = function (query) {
  var company = query.where.company;
  delete query.where.company;
  delete query.where.store;

  return P.resolve(query)
    .then(setTable)
    // .then(setStore.bind(this, company))
    .then(j2sql.select)
    .then(db.query)
    .catch(function (err) {
      logger.log('error','service:pos', err.stack);
      return P.reject(new HTTPError(500, 'Database Error'));
    });
};

function setTable(query) {
  query.from = 'pos_aggregated_hourly';
  return query;
}

function setStore (company, query) {
  return models.Store.findOne({_id : objectId(query.where.store), company : company})
      .exec()
      .then(function (store) {
        logger.log('debug','pos.service:debug:store', store);
        if (!store) {
          return P.reject(new HTTPError(400, 'Store does not exist'));
        }
        logger.log('debug','stuff', 'what!');
        query.where.store = store.toObject().dataId;
        return query;
      });
}
