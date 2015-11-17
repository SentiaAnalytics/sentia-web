'use strict';
var SessionService = require('../services/sessions.service');

exports.authenticate = {
  handler : function (req, res, next) {
    logger.log('info', 'access:session', req.body);
    return SessionService.authenticate(req.body)
      .then(function (user) {
        console.log('AUTHENTICATED');
        console.log('req.session', req.session);
        req.session.user = user;
        req.session.company = user.company;
        console.log('SESSION', {user: user});
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
