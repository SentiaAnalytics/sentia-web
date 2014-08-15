'use strict';
var _ = require('lodash'),
    log = require('sails').log,
    squel = require('squel'),
    moment = require('moment'),
    when = require('when');

exports.buildInsertQuery = function (payload) {
    var rows, query;
    rows = payload.data.reduce(function (result, item) {
        result.push({
            "cam": Number(payload.cam),
            "store": Number(payload.store),
            "company": Number(payload.company),
            "time": moment(payload.time).format('YYYY-MM-DD HH:mm:ss'),
            x : item.x,
            y : item.y,
            heat : item.heat,
            dx : item.dx,
            dy : item.dy
        });
        return result;
    }, []);
    query = squel.insert()
        .into('map')
        .setFieldsRows(rows)
        .toString();

    return when.resolve(query);
};


exports.insertMapData = function (query) {

}
// ## Create
// creates a number of maps
// takes a combined map object.
// returns a promise
exports.create = function (payload) {
    return when(payload)
        .then(exports.buildInsertQuery)
        .then(exports.runMapQuery);
};
/**
 * build a query for timeline
 * @param  {payload} payload request payload
 * @param  {object} user
 * @return {promise}
 * @author Andreas
 * @date   2014-07-17
 */
exports.buildTimelineQuery = function (payload, user) {
    var date = moment(payload.date);
    // update the date with the correct hours
    date.hours(payload.hour);
    // build query
    var query = squel.select()
        .field('sum(1) as count')
        .field('extract(hour from time) as hour')
        .where('time BETWEEN ? AND ?', date.format('YYYY-MM-DD HH:mm:ss'), date.add('day', 1).format('YYYY-MM-DD HH:mm:ss'))
        .where('company = ?', user.company)
        .where('cam = ?', payload.cam)
        .from('map')
        .group('hour')
        .order('hour')
        .toString();
    // return a promise
    return when.resolve(query);
};
/**
 * get data from the Map table
 * @param  {String} query
 * @return {Promise}
 * @author Andreas
 * @date   2014-07-17
 */
exports.runMapQuery = function (query) {
    log.debug(query);
    // due to the format of the query function we are using deferred
    var deferred = when.defer();
    Map.query(query, function (err, result) {
        if (err) {
            log.debug(err);
            deferred.reject(err);
        } else {
            deferred.resolve(result.rows);
        }
    });
    return deferred.promise;
};
// ## Timeline
// get a timeline representing the map data for a gice period
exports.timeline = function (payload, user) {
    return exports.buildTimelineQuery(payload,user)
        .then(exports.runMapQuery);
};
// ## buildMapQuery
// generates a SQL query from the payload
// returns a promise resolved with the querystring
exports.buildMapQuery = function (payload, user) {
    var date = moment(payload.date).hours(payload.hour);
    var query = squel.select()
        .field('x')
        .field('y')
        .field('avg(dx) as dx')
        .field('avg(dy) as dy')
        .field('avg(heat) as heat')
        .where('time BETWEEN ? AND ?', date.format('YYYY-MM-DD HH:mm:ss'), date.add('day', 1).format('YYYY-MM-DD HH:mm:ss'))
        .where('company = ?', user.company)
        .where('cam = ?', payload.cam)
        .from('map')
        .group('x')
        .group('y')
        .toString();

    return when.resolve(query);
};
exports.find = function (payload, user) {
    return exports.buildMapQuery(payload, user)
        .then(exports.runMapQuery);
};