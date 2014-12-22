'use strict';
var mysql = require('../services/mysql.service');
module.exports = function () {
  mysql.connect();
  return;
};
