'use strict';
module.exports = function () {
  global.R = require('ramda');
  global.Promise = require('bluebird');
  global.logger = require('../helpers/logger');
};
