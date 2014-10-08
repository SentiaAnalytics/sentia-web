// # Maps
// Endpoints for getting map data
//
'use strict';
var PeoplesService = require('../services/PeoplesService'),
  lo = require('lodash'),
  middleware = require('../middleware');

// ## Read
//

exports.find = {
  handler : function (req) {
    return PeoplesService.find(req.query);
  },
  middleware : [middleware.company],
  query : {
    additionalProperties : false,
    required : ['camera', 'from', 'to'],
    properties : {
      camera : {
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
