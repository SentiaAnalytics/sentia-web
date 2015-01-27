'use strict';
var StoresService = require('../services/stores.service'),
  middleware = require('../middleware'),
  lodash = require('lodash');

exports.read = {
  url : ':_id',
  handler : function (req, res, next) {
    return StoresService.read(lodash.merge(req.params, req.query));
  },
  middleware : [middleware.read]
};

exports.get = {
  url : '',
  handler : function (req, res, next) {
    return StoresService.get(req.query);
  },
  middleware : [middleware.get]
};
