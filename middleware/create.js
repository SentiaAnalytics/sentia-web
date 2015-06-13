'use strict';
var HTTPError = require('node-http-error');
var log = require('bragi').log;
module.exports = function (req, res, next) {
  req.body = R.merge(req.body, {company : req.session.company});
  return next();
};
