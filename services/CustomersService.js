//
//Service for handeling various user related tasks
'use strict';
var moment = require('moment'),
    when = require('when');


// ## Find
// returns all elements matching the supplied query
exports.find = function (payload, user) {
    var from, to;

    // define the time range
    from = moment(payload.date)
        .utc()
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0);
    to = moment(from)
        .utc()
        .add('day', 1);

    // query customers
    return Customers.find()
        .where({
            time : {'>=' : from.format('YYYY-MM-DD HH:mm:SS'), '<' :to.format('YYYY-MM-DD HH:mm:SS') },
            company : user.company
        })
        .then(function (customers) {
            return customers;
        });
};

// ## Create
// Simple wrapper for Customers create that allows for easy extension
// in the future.
exports.create = function (payload) {
    return Customers.create(payload);
};