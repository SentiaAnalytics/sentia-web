'use strict';
var UsersService = require('../services/users.service'),
  middleware = require('../middleware'),
  lodash = require('lodash');
exports.create = {
  handler : function (req, res, next) {
    UsersService.create(lodash.merge(req.body,req.query))
      .then(function (user) {
        return res.status(201)
          .send(user);
      })
      .catch(next);
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
exports.get = {
  handler : function (req) {
    return UsersService.find(req.query);
  },
  middleware : [middleware.company],
  query :{
    additionalProperties:false
  }
};
