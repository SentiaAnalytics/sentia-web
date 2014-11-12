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
    .then(exports._getCamera)
    .then(exports._buildPeopleQuery)
    .then(function (query) {
      return query;
    })
    .then(db.query)
    .catch(function (err) {
      console.log(err.stack);

    });
};
exports._getCamera = function (query) {
  return models.Camera.findOne({_id : objectId(query.camera), company : query.company})
    .exec()
    .then(function (camera) {
      if (!camera) {
        return P.reject(new E.badRequestError('Camera does not exist'));
      }
      // query.dataId = camera.toObject().dataId;
      return query;
    });
};
exports._buildPeopleQuery = function (query) {
  return squel.select()
    .field('people_in')
    .field('people_out')
    .field('bounce')
    .field('hour(time) + 2', 'hour')
    .from('people')
    .where('time < ?', query.to)
    .where('time > ?', query.from)
    .where('cam = ?', query.camera)
    .toString();
};
