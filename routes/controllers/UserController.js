/*jslint node:true, nomen:true*/
/* global Users:true */
'use strict';
module.exports = {
    // ##Login
    // user login route
    login: function (req, res) {
        var bcrypt = require('bcrypt');
        if (!req.body.email || !req.body.password) {
            res.json({error : 'Missing user or password'}, 404);
            return;
        }
        User.findOneByEmail(req.body.email).done(function (err, user) {
            if (err) {res.json({ error: 'DB error' }, 509);}

            if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    if (err) {res.json({ error: 'Server error' }, 500);}

                    if (match) {
                        // password match
                        req.session.user = user;
                        res.json(user);
                    } else {
                        // invalid password
                        if (req.session.user) {req.session.user = null;}
                        res.json({ error: 'Invalid password' }, 400);
                    }
                });
            } else {
                res.json({ error: 'User not found' }, 404);
            }
        });
    },
    // ## Logout
    logout : function (req, res) {
        req.session.destroy();
        res.send();
    },
    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to UsersController)
    */
    _config: {}


};
