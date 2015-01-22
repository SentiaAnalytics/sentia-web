'use strict';
var E = require('express-http-errors'),
  log = require('bragi').log;
module.exports = function (req, res, next) {
  if (!req.query || !req.query.json) {
    return next();
  }
  try {
    req.query = JSON.parse(req.query.json);
  } catch (e) {
    return next(new E.BadRequestError('Invalid json'));
  }
  return next();
};
