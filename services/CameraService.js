'use strict';
var db = require('./postgres'),
  squel = require('squel'),
  when = require('when');

exports.find = function (query) {
  return when(query)
    .then(this._getCameras);
};

exports._getCameras = function (query) {
  var q = squel.select()
    .from('"camera"')
    .where('company = ?', query.company);

  if (query.store) {
    q.where('store = ?', query.store);
  }

  if (query.order) {
    q.order(query.order);
  }

  if (query.limit) {
    q.limit(query.limit);
  }

  if (query.skip) {
    q.offset(query.skip);
  }

  return db.query(q.toString());
};
