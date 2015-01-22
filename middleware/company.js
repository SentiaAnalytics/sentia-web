// Adds the company id to the request query object
'use strict';
var E = require('express-http-errors'),
  objectId = require('mongoose').Types.ObjectId;

module.exports = function (req, res, next) {
  console.log(req.session.user.company);
  if (!req.session.user.company) {
    throw new E.ForbiddenError('User session is not associated with a company.');
  }
  req.query = req.query || {};
  req.query.company = objectId(req.session.user.company);
  return next();
};
