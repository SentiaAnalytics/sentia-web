'use strict';
var log = require('bragi').log;
module.exports = function (req, res, next) {
  var query;
  if (req.query.query) {
    req.query = JSON.parse(req.query.query);
    return next();
  }

  query = {
    where : {

    }
  };
};
