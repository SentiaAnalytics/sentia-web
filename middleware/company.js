// Adds the company id to the request query object
'use strict';
var E = require('express-http-errors'),
  objectId = require('mongoose').Types.ObjectId;

module.exports = function (req, res, next) {
  if (req.session.user && req.session.user.company) {
    req.query.company = objectId(req.session.user.company);
    return next();
  }
  if (req.session.company) {
    req.query.company = req.session.company._id;
    return next();
  }

  throw new E.ForbiddenError('User session is not associated with a company.');
};
