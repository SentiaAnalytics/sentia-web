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
  console.log('find');
  return P.resolve(query)
    .then(exports._getCamera)
    .then(exports._buildPeopleQuery)
    .then(function (query) {
      console.log('sql query');
      console.log(query);
      return query;
    })
    .then(db.query)
    .catch(function (err) {
      console.log(err.stack);

    });
};
exports._getCamera = function (query) {
  console.log('_getCamera');
  console.log(query);
  return models.Camera.findOne({_id : objectId(query.camera), company : query.company})
    .exec()
    .then(function (camera) {
      if (!camera) {
        return P.reject(new E.badRequestError('Camera does not exist'));
      }
      console.log(camera.toObject());
      query.dataId = camera.toObject().dataId;
      return query;
    });
};
exports._buildPeopleQuery = function (query) {
  return squel.select()
    .field('people_in')
    .field('people_out')
    .field('bounce')
    .field('hour(time)', 'hour')
    .from('people')
    .where('time < ?', query.to)
    .where('time > ?', query.from)
    .where('cam = ?', query.dataId)
    .toString();
};
