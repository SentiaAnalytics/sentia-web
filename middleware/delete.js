'use strict';
var HTTPError = require('node-http-error');
module.exports = function (req, res, next) {
  req.params = R.merge(req.params, {company : req.session.company});
  return next();
};
