'use strict';
var squel = require('squel'),
  E = require('express-http-errors'),
  when = require('when'),
  moment = require('moment'),
  db = require('./postgres');


exports.find = function(query) {
  return when(query)
    .then(this._buildGetQuery)
    .then(db.query);
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


exports._buildGetQuery = function(query) {
  var q, from , to;
  from = moment(query.from || 0).format('YYYY-MM-DD HH:mm:ss');
  to = moment(query.to || 0).format('YYYY-MM-DD HH:mm:ss');
  q = squel.select()
    .where('time BETWEEN ? AND ?', from, to)
    .where('company = ?', query.company)
    .from('"map"');

    if (query.cam) {
      q.where('cam = ?', query.cam);
    }

  return q.toString();
};
