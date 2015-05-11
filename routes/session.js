'use strict';
var SessionService = require('../services/sessions.service'),
  logger = require('bragi');

exports.authenticate = {
  handler : function (req, res, next) {
    logger.log('access:session',req.body);
    return SessionService.authenticate(req.body)
      .then(function (user) {
        req.session.user = user;
        req.session.company = user.company;
        return {user: user};
      });
  },
  method : 'POST'
};

exports.delete = {
  handler : function (req, res) {
    req.session.destroy();
    res.send(200);
  }
};

exports.read = {
  handler : function (req, res) {
    return res.send({user : req.session.user});
  }
};
