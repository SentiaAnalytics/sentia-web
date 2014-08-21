'use strict';
var db = require('./postgres'),
  squel = require('squel');

exports.find = function (query) {
  var q = squel.select()
      .from('companies');
  return db.query(q.toString());


};
