'use strict';
var HTTPError = require('node-http-error');
var lodash = require('lodash');
var log = require('bragi').log;
module.exports = function (req, res, next) {
  if (req.query && req.query.json) {
    try {
      req.query = JSON.parse(req.query.json);
    } catch (e) {
      return next(new HTTPError(400, 'Invalid json'));
    }
  }
  req.query = lodash.merge({}, req.query);
  req.query.where = lodash.merge({}, req.query.where, {company: req.session.company});
  return next();
};
