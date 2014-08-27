// Adds the company id to the request query object
'use strict';
var E = require('express-http-errors');

module.exports = function (req, res, next) {
  if (!req.session.user.company) {
    throw new E.ForbiddenError('User session is not associated with a company.');
  }

  req.query.company = req.session.user.company;
  return next();
};
