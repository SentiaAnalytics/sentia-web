// 'use strict';
// var mysql = require('mysql');
// var P = require('bluebird');
// var config = require('config');
// var connection = mysql.createConnection(config.mysql);

// connection.connect();
// exports.query = function (query) {
//   return new P(function (resolve, reject) {
//     connection.query(query, function (err, rows) {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(rows);
//     });
//   });
// };
// exports.connection = connection;
'use strict';
var mysql2 = require('mysql2');
var config = require('config');
var P = require('bluebird');
var url = require("url");
var SocksConnection = require('socksjs');

var mysql_server_options = {
  host: url.parse(config.mysql).hostname,
  port: url.parse(config.mysql).port
};

var socks_options = {
  host: url.parse(config.proxy).hostname,
  port: 1080,
  user: url.parse(config.proxy).auth.split(':')[0],
  pass: url.parse(config.proxy).auth.split(':')[1],
};

var socksConn = new SocksConnection(mysql_server_options, socks_options);

var mysql_options =  {
  database: 'sentia',
  user: url.parse(config.proxy).auth.split(':')[0],
  password: url.parse(config.proxy).auth.split(':')[1],
  stream: socksConn
};

var connection = mysql2.createConnection(mysql_options);
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

