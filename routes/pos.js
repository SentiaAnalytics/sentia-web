// # Maps
// Endpoints for getting map data
//
'use strict';
var PosService = require('../services/posService'),
  middleware = require('../middleware');

// ## Read
//
exports.get = {
  handler : function (req) {
    return PosService.get(req.query);
  },
  middleware : [middleware.get]
};
