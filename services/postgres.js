//Postgres driver, to wrap the postgres client library with promises.
'use strict';
var pg = require('pg');
var E = require('express-http-errors');
var config = require('config');
var when = require('when');
var _ = require('lodash');
var copyTo = require('pg-copy-streams').to;
var copyFrom = require('pg-copy-streams').from;

exports.dbConfig = _.pick(config.postgres, 'host', 'password', 'user', 'database', 'port', 'ssl');

//#### creates a db connection

function createConnection(url) {
  return when.promise(function(resolve, reject) {

    //can't lift due to non standard callback
    pg.connect(url, function(err, client, done) {

      if (err) {
        reject(err);
        return;
      }
      //resolve the client and callback into a single object
      resolve({
        repool: done,
        client: client
      });
    });
  });
}

//#### execute a sql query
exports.query = function(sqlquery) {
  return createConnection(exports.dbConfig).then(function(connection) {

    return when.promise(function(resolve, reject) {

      //unable to lift via promises
      connection.client.query(sqlquery, function(err, result) {
        //close the connection to return back to the pool
        connection.repool();

        if (err) {
          console.log(err);
          reject(new E.InternalServerError('Postgres Error'));
        } else {
          resolve(result.rows);
        }
      });
    });
  });
};

exports.streamFrom = function(table) {
  return createConnection(exports.dbConfig)
    .then(function(connection) {
      return connection.client.query(copyTo('COPY ' + table + " FROM STDOUT DELIMITER ',' HEADER CSV"));
    });
};

exports.streamTo = function(table) {
  return createConnection(exports.dbConfig)
    .then(function(connection) {
      return connection.client.query(copyFrom('COPY ' + table + " FROM STDIN DELIMITER ',' HEADER CSV"));
    });
};
