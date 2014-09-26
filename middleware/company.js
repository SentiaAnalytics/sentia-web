// Adds the company id to the request query object
'use strict';
var E = require('express-http-errors');

module.exports = function (req, res, next) {
  console.log(req.session.user.CompanyId);
  if (!req.session.user.CompanyId) {
    throw new E.ForbiddenError('User session is not associated with a company.');
  }

  req.query.CompanyId = req.session.user.CompanyId;
  return next();
};
