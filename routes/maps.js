// # Maps
// Endpoints for getting map data
//
'use strict';
var MapsService = require('../services/MapsService'),
  lo = require('lodash'),
  middleware = require('../middleware');

// ## Timeline
// returns an array representing the activity in the given time period.
// The results are grouped by timeslice provided in the `group` parameter
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

// ## Read
//

exports.find = {
  handler : function (req) {
    return MapsService.find(req.query);
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
      limit : {
        stringType : 'integer'
      },
      order : {
        type : 'string'
      },
      desc : {
        type : 'boolean'
      }

    }
  }
};
