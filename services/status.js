'use strict';
var db = require('../helpers/mysql');
module.exports = function () {
  return db.query('show status')
    .then(function (result) {
      logger.info('STATUS', result);
      return result;
    });
}
