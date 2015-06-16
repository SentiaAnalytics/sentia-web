'use strict';
var HTTPError = require('node-http-error');
module.exports = function (req, res, next) {
  req.body = R.merge(req.body, {company : req.session.company});
  return next();
};
