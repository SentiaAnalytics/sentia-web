// Check whether the user has been authenticated (logged in)
'use strict';
module.exports = function(req, res, next) {
    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.session.user) {
        return next();
    }
    // User is not allowed
    return res.forbidden('You are not permitted to perform this action.');
};