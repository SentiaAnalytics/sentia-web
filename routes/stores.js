'use strict';
var StoresService = require('../services/stores.service'),
  middleware = require('../middleware');

exports.read = {
  url : ':_id',
  handler : function (req, res, next) {
    console.log('STORE QUERY', R.merge(req.params, req.query));
    return StoresService.read(R.merge(req.params, req.query))
      .then(R.tap(function (value) {
        console.log('STORE', value);  
      }));
  },
  middleware : [middleware.read]
};

exports.get = {
  url : '',
  handler : function (req, res, next) {
    return StoresService.get(req.query)
      .then(R.tap(function (value) {
        console.log('STORE', value);
      }))
  },
  middleware : [middleware.get]
};


exports.create = {
  handler : function (req, res, next) {
    return StoresService.create(req.body);
  },
  middleware : [middleware.create]
};

exports.update = {
  url : ':_id',
  handler : function (req, res, next) {
    return StoresService.update(req.params, req.body);
  },
  middleware : [middleware.update]
};
