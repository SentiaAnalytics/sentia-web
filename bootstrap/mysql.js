'use strict';
var mysql = require('../services/mysql.service');
module.exports = function () {
  mysql.connect();
  return mysql.query('show status')
    .then(function (status) {
       console.log('MYSQL connected');
    });
};
