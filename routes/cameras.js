// #Cameras
// Endpoints for Managing camera objects

'use strict';
var middleware = require('../middleware'),
  CameraService = require('../services/cameras.service');

// ## Read
// get a specific camera by id
exports.read = {
  url : ':_id',
  handler : function (req, res, next) {
    return CameraService.read(R.merge(req.params, req.query));
  },
  middleware : [middleware.read]
};

// ## Find
// get a list of cameras based on the supplied queries
exports.get = {
  handler : function (req, res, next) {
    return CameraService.find(req.query);
  },
  middleware : [middleware.get]
};
