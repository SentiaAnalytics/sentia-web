'use strict';
var mysql2 = require('mysql2');
var config = require('config');
var P = require('bluebird');
var url = require("url");
var SocksConnection = require('socksjs');
var connection, mysql_server_options, mysql_options, socks_options, socksConn;

console.log('first');

console.log(mysql_options);
if ( false && config.proxy) {
  mysql_server_options = {
    host: url.parse(config.mysql).hostname,
    port: url.parse(config.mysql).port
  };

  socks_options = {
    host: url.parse(config.proxy).hostname,
    port: 1080,
    user: url.parse(config.proxy).auth.split(':')[0],
    pass: url.parse(config.proxy).auth.split(':')[1],
  };
  socksConn = new SocksConnection(mysql_server_options, socks_options);
  mysql_options =  {
    database: 'sentia',
    user: url.parse(config.mysql).auth.split(':')[0],
    password: url.parse(config.mysql).auth.split(':')[1],
    stream : socksConn
  };
  connection = mysql2.createConnection(mysql_options);
} else {
  connection = mysql2.createConnection(config.mysql);
}
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

