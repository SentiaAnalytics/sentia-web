'use strict';
var j2sql = require('json2sql'),
  db = require('./mysql'),
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
    query.from = 'people';
    return P.resolve(query)
      .then(exports.checkPermissions(company))
  }
}
exports.checkPermissions = function (company) {
  return function (query) {
    log('pos.service:debug:query', query.where.store);
    log('pos.service:debug:company', company);
    return models.Cameras.findOne({_id : objectId(query.where.camera), company : objectId(company)})
      .exec()
      .then(function (camera) {
        log('pos.service:debug:camera', camera);
        if (!camera) {
          return P.reject(new E.BadRequestError('Camera does not exist'));
        }
        return query;
      });
  }
};

