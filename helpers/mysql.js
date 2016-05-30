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

const safeQuery = R.curry((query, values) => {
  console.log('SAFE QUERY', query, values);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      connection.query(query, values, (err, rows) => {
        if (err) reject(err);
        connection.release();
        return resolve(rows);
      });
    });
  })
});
exports.query = promisify(query);
exports.safeQuery = safeQuery
