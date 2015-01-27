// # Maps
// Endpoints for getting map data
//
'use strict';
var MapsService = require('../services/maps.service'),
  lo = require('lodash'),
  middleware = require('../middleware');

// ## Read
//

exports.get = {
  handler : function (req) {
    req.query.company = req.session.company;
    return MapsService.find(req.query);
  }
};
