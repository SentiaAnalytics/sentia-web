'use strict';
var Users = require('../services/UsersService');

exports.login = {
  handler : function (req, res, next) {
    return Users.login(req.body)
      .then(function (user) {
        req.session.user = user;
        return user;
      });
  },
  body : {
    required : ['email', 'password'],
    additionalProperties : false,
    properties : {
      email : {
        type : 'string'
      },
      password : {
        type : 'string'
      }
    }
  },
  method : 'POST'
};

exports.logout = {
  handler : function (req, res) {
    req.session.destroy();
    res.send(200);
  }
};

exports.active = {
  handler : function (req, res) {
    return res.send(req.session.user);
  }
};
