'use strict';
var squel = require('squel'),
  E = require('express-http-errors'),
  when = require('when'),
  db = require('./postgres');


exports.read = function (query) {
  return when(query)
    .then(this._buildReadQuery)
    .then(db.query)
    .then(this._getFirstElement);
};


exports._buildReadQuery = function (query) {
  var q = squel.select()
    .from('"map"')
    .where('id = ?', query.id)
    .where('company = ?', query.company);

  return q.toString();
};

exports._getFirstElement = function (rows) {
  if (rows.length === 0) {
    throw new E.NotFoundError('Could not find map');
  }
  return rows[0];
};
