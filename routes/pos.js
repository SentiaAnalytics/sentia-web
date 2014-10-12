// # Maps
// Endpoints for getting map data
//
'use strict';
var PosService = require('../services/PosService'),
  lo = require('lodash'),
  middleware = require('../middleware');

// ## Read
//
exports.find = {
  handler : function (req) {
    return PosService.find(req.query);
  },
  middleware : [middleware.company],
  query : {
    additionalProperties : false,
    required : ['store', 'from', 'to'],
    properties : {
      store : {
        type : 'string'
      },
      from : {
        type : 'string'
      },
      to : {
        type : 'string'
      }
    }
  }
};
