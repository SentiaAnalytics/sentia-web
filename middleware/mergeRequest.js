// Merge req.query and req.body.
// This allows a single interface in the controllers, independant of wheter the function was called with get or post
'use strict';
var _ = require('lodash');
module.exports = function(req, res, next) {
    _.extend(req.body, req.query);
    next();
};