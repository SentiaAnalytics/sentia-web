'use strict';
var logger = require('bragi');

if (process.env.NODE_ENV === 'prod') {
  logger.log('config', 'running in prod mode');
  logger.options.groupsDisabled = ['debug'];
}
module.exports = function () {
  logger.promise = function (tags) {
      return function (msg) {
        logger.log(tags || '', msg);
        return msg;
      };
  };
};
