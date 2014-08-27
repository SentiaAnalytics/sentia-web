'use strict';
var middleware = require('../../middleware'),
  CameraService = require('../../services/CameraService');

exports.find = {
  url : '/stores/:storeId/cameras',
  handler : function (req, res, next) {
    return CameraService.find(req.query)
      .then(function (r) {
        console.log('CAMERAS');
        console.log(r);
        return r;
      });
  },
  middleware : [middleware.company]
};
