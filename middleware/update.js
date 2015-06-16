'use strict';
var HTTPError = require('node-http-error');
var objectId = require('mongoose').Types.ObjectId;
module.exports = function (req, res, next) {
  req.params = R.merge(req.params, {company : req.session.company});
  req.params._id = objectId(req.params._id);
  req.body = R.merge(req.body, {company : req.session.company});
  return next();
};
