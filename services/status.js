'use strict';
var db = require('./mysql.service');
module.exports = function () {
  return db.query('SELECT NOW()')
    .then(function (result) {
      logger.info('STATUS', result);
      return result;
    });
}
