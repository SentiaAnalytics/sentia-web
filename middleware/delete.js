'use strict';
var HTTPError = require('node-http-error');
var log = require('bragi').log;
module.exports = function (req, res, next) {
  req.params = R.merge(req.params, {company : req.session.company});
  return next();
};
