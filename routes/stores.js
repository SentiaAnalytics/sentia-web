'use strict';
var StoresService = require('../services/StoresService'),
  lodash = require('lodash');

exports.read = {
  url : ':_id',
  handler : function (req, res, next) {
    return StoresService.read(lodash.merge(res.params, res.query));
  }
};
