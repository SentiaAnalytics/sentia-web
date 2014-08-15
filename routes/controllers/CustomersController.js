'use strict';
var log = require('sails').log;
module.exports = {
    // ## find customer data
    find: function(req, res) {
        CustomersService.find(req.body, req.session.user)
            .then(function (result) {
                res.send(result);
            })
            .catch(function(err) {
                log.debug(err);
                res.send(500, err);
            });
    },
    create : function (req, res) {
        CustomersService.create(req.body)
            .then(function (result) {
                res.send(result);
            })
            .catch(function (err) {
                log.warn(err);
                res.send(500, err);
            });
    },

    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to CustomersController)
    */
    _config: {}


};
