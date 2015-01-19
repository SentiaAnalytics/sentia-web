'use strict';
var logger = require('bragi');
module.exports = function () {
  logger.promise = function (tags) {
      return function (msg) {
        logger.log(tags || '', msg);
        return msg;
      };
  };
};
