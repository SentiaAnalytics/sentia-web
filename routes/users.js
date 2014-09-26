'use strict';
var UsersService = require('../services/UsersService'),
  middleware = require('../middleware'),
  lodash = require('lodash');
exports.create = {
  handler : function (req) {
    return UsersService.create(lodash.merge(req.body,req.query));
  },
  middleware : [middleware.company],
  body : {
    required : ['email', 'password'],
    additionalProperties : false,
    properties : {
      email : {
        type : 'string',
        format : 'email'
      },
      password : {
        type : 'string'
      },
      firstname : {
        type : 'string'
      },
      lastname : {
        type : 'string'
      }
    }
  },
  query :{
    additionalProperties:false
  }
};
exports.find = {
  handler : function (req) {
    return UsersService.find(req.query);
  },
  middleware : [middleware.company],
  query :{
    additionalProperties:false
  }
};
