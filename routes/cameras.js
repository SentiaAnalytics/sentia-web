'use strict';
var middleware = require('../middleware'),
  CameraService = require('../services/CamerasService');

// # Find
// get a list of cameras based on the supplied queries
exports.find = {
  handler : function (req, res, next) {
    return CameraService.find(req.query);
  },
  middleware : [middleware.company],
  query : {
    properties : {
      name : {
        type : 'string'
      },
      store : {
        stringType : 'integer'
      },
      limit : {
        stringType : 'integer'
      },
      skip : {
        stringType : 'integer'
      },
      order : {
        type : 'string'
      }
    }
  }
};

//# Read
// get a specific camera by id
exports.read = {
  handler : function (req, res, next) {
    return CameraService.find(req.query);
  },
  middleware : [middleware.company],
  params : {
    required : ['id'],
    properties : {
      id : {
        type : 'integer'
      }
    }
  }
};
