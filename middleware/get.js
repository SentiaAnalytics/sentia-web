'use strict';
var HTTPError = require('node-http-error');
module.exports = function (req, res, next) {
  if (req.query && req.query.json) {
    try {
      req.query = JSON.parse(req.query.json);
    } catch (e) {
      return next(new HTTPError(400, 'Invalid json'));
    }
  }
  req.query = R.merge({}, req.query);
  req.query.where = R.merge(req.query.where, {company: req.session.company});
  return next();
};
