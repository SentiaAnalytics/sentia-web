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
    .then(exports._buildMapQuery)
    .then(function (query) {
      console.log('sql query');
      console.log(query);
      return query;
    })
    .then(db.query)
    .then(function (data) {
      console.log('response from db');
      console.log(data); 
      return data;
    })
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
      query.camera = camera;
      return query;
    });
};
exports._buildMapQuery = function (query) {
  console.log('build');
  console.log(query);
  return squel.select()
    .field('x')
    .field('y')
    .field('avg(dx)', 'dx')
    .field('avg(dy)', 'dy')
    .field('avg(heat)', 'heat')
    .from('map')
    .where('time < ?', query.to)
    .where('time > ?', query.from)
    .where('cam = ' + 1)
    .group('x, y')
    .toString();
};
