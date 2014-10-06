// 'use strict';
// var squel = require('squel'),
//   db = require('./mysql'),
//   E = require('express-http-errors'),
//   P = require('bluebird'),
//   moment = require('moment');

// exports.getMap = function (query) {
//   return P.resolve(query)
//     .then(exports._buildMapQuery)
//     .then(db.query);
// };
// exports._buildMapQuery = function (query) {
//   return squel.select()
//     .from('"maps"')
//     .where('time < now()')
//     .limit(1000);
// };
