'use strict';
var mysql = require('mysql');
var P = require('bluebird');
var config = require('config');
var connection = mysql.createConnection(config.mysql);

connection.connect();
exports.query = function (query) {
  return new P(function (resolve, reject) {
    connection.query(query, function (err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
};
exports.connection = connection;
