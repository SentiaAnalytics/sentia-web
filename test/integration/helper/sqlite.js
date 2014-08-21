'use strict';
var when = require('when'),
  sqlite3 = require('sqlite3').verbose(),
  db = new sqlite3.Database(':memory:');

function executeQuery (query) {
  console.log(query);
  return when.promise(function (resolve, reject) {
    db.all(query, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

exports.query = function (query) {
  var queries = query.split(';');
  return queries.reduce(function (prev, item) {
    if (!/^\s*$/i.test(item)) {
      return prev.then(function () {
        return executeQuery(item + ';');
      });
    } else {
      return prev;
    }
  }, when.resolve())
    .then(function (result) {
        return {rows : result};
    });

};
