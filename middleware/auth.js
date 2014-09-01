// Check whether the user has been authenticated (logged in)
'use strict';
var E = require('express-http-errors');
module.exports = function(req, res, next) {
    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.session.user || req.url === '/api/session/authenticate') {
        return next();
    }
    // User is not allowed
    return next(new E.NotAuthorizedError('You must login to perform this action.'));

};
