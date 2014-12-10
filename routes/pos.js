// # Maps
// Endpoints for getting map data
//
'use strict';
var PosService = require('../services/PosService'),
  lo = require('lodash'),
  log = require('bragi').log,
  middleware = require('../middleware');

// ## Read
//
exports.find = {
  handler : function (req) {
    log('debug:controller:pos:handler', req.session.user.company);
    return PosService.find(req.query, req.session.user.company);
  },
  middleware : [middleware.jsonQuery],
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
      }
    }
  }
};
