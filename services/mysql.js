'use strict';
var mysql2 = require('mysql2');
var config = require('config');
var P = require('bluebird');
var url = require("url");
var SocksConnection = require('socksjs');
var mysql_server_options, mysql_options, socks_options, socksConn;
var connection = mysql2.createConnection(config.mysql);
exports.query = function (query) {
  return new P(function (resolve, reject) {
    connection.query(query, function(err, rows, fields) {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
};
exports.close = function () {
  socksConn.dispose();
  connection.end();
};

