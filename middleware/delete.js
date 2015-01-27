'use strict';
var HTTPError = require('node-http-error');
var lodash = require('lodash');
var log = require('bragi').log;
module.exports = function (req, res, next) {
  req.params = lodash.merge({}, req.params, {company : req.session.company});
  return next();
};
