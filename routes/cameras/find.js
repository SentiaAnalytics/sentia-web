'use strict';
var cameraService = require('../../services/cameraService');

module.exports =  {
    action : function(req, res) {
        log.debug('GET camera/find');
        var where = {
            company: req.session.user.company
        };
        if (req.body.id) {
            where.id = req.body.id;
        }
        cameraService.find(req.query)
            .then(function(err, cameras) {
                res.send(cameras);
        }).catch(next);
    }
}
