'use strict';
var HTTPError = require('node-http-error');
var lodash = require('lodash');
var logger = require('bragi');
module.exports = function (req, res, next) {
  if (req.query && req.query.json) {
    try {
      req.query = JSON.parse(req.query.json);
    } catch (e) {
      return next(new HTTPError(400, 'Invalid json'));
    }
  }
  req.query = lodash.extend({}, req.query);
  req.query.where = lodash.extend({}, req.query.where, {company: req.session.company});
  logger.log('middleware.get:debug:query', req.query);
  return next();
};
