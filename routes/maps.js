'use strict';
var MapsService = require('../services/MapsService'),
  lo = require('lodash'),
  middleware = require('../middleware');

exports.timeline = {
  url : 'timeline',
  handler : function (req) {
    return MapsService.timeline(req.query);
  },
  middleware : [middleware.company],
  query : {
    additionalProperties : false,
    properties : {
      cam : {
        stringType : 'integer'
      },
      from : {
        stringType : 'integer'
      },
      to : {
        stringType : 'integer'
      },
      group : {
        type : 'string'
      }
    }
  }
};

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
