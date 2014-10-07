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
var url = require("url");
var SocksConnection = require('socksjs');

var mysql_server_options = {
  host: '173.194.241.222',
  port: 3306
};

var socks_options = {
  host: 'proxy-54-75-227-164.proximo.io',
  port: 1080,
  user: 'proxy',
  pass: '50a144708638-4096-ae38-976124a5e15c'
};

var socksConn = new SocksConnection(mysql_server_options, socks_options);

var mysql_options =  {
  database: 'sentia',
  user: 'root',
  password: 'sqlaboutsafe',
  stream: socksConn
};

var mysqlConn = mysql2.createConnection(mysql_options);

mysqlConn.query('SELECT * from maps limit 1', function(err, rows, fields) {
  if (err) throw err;

  console.log('Result: ', rows);

  socksConn.dispose();
  mysqlConn.end();
});
