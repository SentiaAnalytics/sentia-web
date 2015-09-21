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
    return PosService.get(req.query)
      .then(function (data) {
        logger.log('pos data', data);
        return data;
      })
      .catch(function (err) {
        logger.error('pos error', err);
        return Promise.reject(err);
      });
  },
  middleware : [middleware.get]
};
