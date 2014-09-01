'use strict';
var MapsService = require('../services/MapsService'),
  lo = require('lodash'),
  middleware = require('../middleware');

exports.read = {
  url : ':id',
  handler : function (req) {
    return MapsService.read(lo.merge(req.params, req.query));
  },
  middleware : [middleware.company],
  params : {
    additionalProperties : false,
    required : ['id'],
    properties : {
      id : {
        type : 'integer'
      }
    }
  }
};
