'use strict';
var Users = require('../services/UsersService');

exports.login = {
  handler : function (req, res, next) {
    Users.login(req.body)
      .then(function (user) {
        req.session.user = user;
        return res.send(user);
      })
      .catch(next);
  },
  method : 'POST'
};
exports.logout = {
  handler : function (req, res, next) {
    req.session.destroy();
    res.send(200);
  }
};
exports.active = {
  handler : function (req, res, next) {
    return res.send(req.session.user);
  }
};
