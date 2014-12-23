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
exports.find = {
  handler : function (req) {
    return PosService.find(req.query, req.session.user.company);
  },
  query : {
    additionalProperties : false,
    required : ['where'],
    properties : {
      fields : {
        type : 'object'
      },
      where : {
        type : 'object'
      },
      groupBy : {
        type : 'array'
      },
      orderBy : {
        type : 'object'
      }
    }
  }
};
