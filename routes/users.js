'use strict';
var UsersService = require('../services/users.service'),
  middleware = require('../middleware');
exports.create = {
  handler : function (req, res, next) {
    UsersService.create(R.merge(req.body,req.query))
      .then(function (user) {
        return res.status(201)
          .send(user);
      })
      .catch(next);
  },
  middleware : [middleware.create]
};
exports.get = {
  handler : function (req) {
    return UsersService.find(req.query);
  },
  middleware : [middleware.get]
};
