'use strict';
const R = require('ramda');
var mysql = require('mysql');
var config = require('config');
var promisify = require('./promisify');
var pool  = mysql.createPool(config.mysql);

function query (query, callback) {
  console.log('QUERY', query);
  pool.getConnection(function (err, connection) {
    if (err) callback(err);
    connection.query(query, function(err, rows) {
      if (err) callback(err);
      connection.release();
      return callback(null, rows);
    });
  });
}

const safeQuery = (query, values, callback) =>  {
  pool.getConnection((err, connection) => {
    if (err) callback(err);
    connection.query(query, values, (err, rows) => {
      if (err) callback(err);
      connection.release();
      return callback(null, rows);
    });
  });
};
exports.query = promisify(query);
exports.safeQuery = R.curryN(2, promisify(safeQuery));
