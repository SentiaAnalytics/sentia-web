// # Maps
// Endpoints for getting map data
//
'use strict';
var PosService = require('../services/pos.service'),
  lo = require('lodash'),
  logger = require('bragi').log,
  middleware = require('../middleware');

// ## Read
//
exports.get = {
  handler : function (req) {
    return PosService.find(req.query);
  },
  middleware : [middleware.get]
};
