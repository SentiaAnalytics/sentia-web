'use strict';
var j2sql = require('json2sql'),
  db = require('../mysql.service'),
  log = require('bragi').log,
  models = require('../../models'),
  HTTPError = require('node-http-error'),
  P = require('bluebird'),
  objectId = require('mongoose').Types.ObjectId,
  moment = require('moment');

function Plogg (data) {
  log('people.service:debug:log', data);
  return data;
}

exports.find = function (query) {
  var company = query.where.company;
  delete query.where.company;
  return P.resolve(query)
    .then(setTable)
    .then(checkPermissions.bind(this, company))
    .then(j2sql.select)
    .then(Plogg)
    .then(db.query)
    .then(Plogg)
    .catch(function (err) {
      log('error:service:people', err.stack);
      return P.reject(new HTTPError(500, 'Database Error'));
    });
};




function setTable (query) {
  query.from = 'people';
  return query;
}

function checkPermissions (company, query) {
  if (!query.where.came) {
    return query; // HUGE SECURITY FUCK!
  }
  log('people.service:debug:query', query.where.store);
  log('people.service:debug:company', company);
  return models.Camera.findOne({_id : objectId(query.where.cam), company : objectId(company)})
    .exec()
    .then(function (camera) {
      log('people.service:debug:camera', camera);
      if (!camera) {
        return P.reject(new HTTPError(400, 'Camera does not exist'));
      }
      return query;
    });

}
