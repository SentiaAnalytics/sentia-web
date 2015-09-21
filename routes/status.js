'use strict';
var status = require('../services/status.js');

exports.get = {
  handler: function (req, res, next) {
    return status();
  }
};
