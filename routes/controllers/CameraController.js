// Controller for all camera related endpoints
/*globals Cameras:false*/
'use strict';
var log = require('sails').log;
module.exports = {
    // ## Find
    // Get a list of or a specific camera
    find: function(req, res) {
        log.debug('GET camera/find');
        var where = {
            company: req.session.user.company
        };
        if (req.body.id) {
            where.id = req.body.id;
        }
        Camera.find()
            .where(where)
            .exec(function(err, cameras) {
                res.send(cameras);
            });
    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to CamerasController)
     */
    _config: {}
};