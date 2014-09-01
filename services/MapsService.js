'use strict';
var squel = require('squel'),
  E = require('express-http-errors'),
  when = require('when'),
  moment = require('moment'),
  db = require('./postgres');


exports.read = function(query) {
  return when(query)
    .then(this._buildReadQuery)
    .then(db.query)
    .then(this._getFirstElement);
};

exports.timeline = function(query) {
  return when(query)
    .then(this._buildTimelineQuery)
    .then(db.query);
};
exports._buildTimelineQuery = function(query) {
  var q, from , to;
  query.group = query.group || 'hour';
  from = moment(query.from || 0).format('YYYY-MM-DD HH:mm:ss');
  to = moment(query.to || 0).format('YYYY-MM-DD HH:mm:ss');
  q = squel.select()
    .field('sum(1) as count')
    .field('extract(' + query.group + ' from time) as hour')
    .where('time BETWEEN ? AND ?', from, to)
    .where('company = ?', query.company)
    .from('"map"')
    .group(query.group)
    .order(query.group);

    if (query.cam) {
      q.where('cam = ?', query.cam);
    }

  return q.toString();
};


exports._buildReadQuery = function(query) {
  var q = squel.select()
    .from('"map"')
    .where('id = ?', query.id)
    .where('company = ?', query.company);

  return q.toString();
};

exports._getFirstElement = function(rows) {
  if (rows.length === 0) {
    throw new E.NotFoundError('Could not find map');
  }
  return rows[0];
};
