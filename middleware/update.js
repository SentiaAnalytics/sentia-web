'use strict';
var HTTPError = require('node-http-error');
var lodash = require('lodash');
var objectId = require('mongoose').Types.ObjectId;
var log = require('bragi').log;
module.exports = function (req, res, next) {
  req.params = lodash.extend({}, req.params, {company : req.session.company});
  req.params._id = objectId(req.params._id);
  req.body = lodash.extend({}, req.body, {company : req.session.company});
  return next();
};
