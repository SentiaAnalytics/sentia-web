'use strict';
var mysql = require('mysql');
var config = require('config');
var promisify = require('./promisify');
var pool  = mysql.createPool(config.mysql);

function query (query, callback) {
  pool.getConnection(function (err, connection) {
    if (err) callback(err);
    connection.query(query, function(err, rows) {
      if (err) callback(err);
      connection.release();
      return callback(null, rows);
    });
  });
}
exports.query = promisify(query);
