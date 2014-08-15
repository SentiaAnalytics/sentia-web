'use strict';
var db = require('./postgres'),
  squel = require('squel');

exports.find = function (query) {
  var query = squel.select()
      .from('companies');
  return db.query(query.toString());


};
