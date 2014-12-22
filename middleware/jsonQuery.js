'use strict';
var E = require('express-http-errors'),
  log = require('bragi').log;
module.exports = function (req, res, next) {
  if (!req.query || !req.query.json) {
    log('debug:middleware', 'No json to parse');
    return next();
  }
  log('stuff', req.query.json);
  try {
    req.query = JSON.parse(req.query.json);
  } catch (e) {
    return next(new E.BadRequestError('Invalid json'));
  }
  log('more:stuff', req.query);
  return next();
};
