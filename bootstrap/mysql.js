'use strict';
var mysql = require('../helpers/mysql');
module.exports = function () {
  return mysql.query('show status')
    .then(function (status) {
       console.log('MYSQL connected');
    });
};
