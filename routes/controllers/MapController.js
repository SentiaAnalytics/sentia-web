'use strict';
var log = require('sails').log;
module.exports = {
    // ## Create
    // create a new Map
    // called by SentiaWorker
    create : function (req, res) {
        log.debug('POST map/create');
        console.log(req.body);
        MapService.create(req.body)
            .then(function () {
                res.send(200);
            })
            .catch(function (err) {
                log.warn(err);
                res.send(500, err);
            });
    },
    // ## Timeline
    // get a timeline with representaional values for the map data
    timeline : function (req, res) {
        MapService.timeline(req.body, req.session.user)
            .then(function (result) {
                res.send(200, result);
            })
            .catch(function (err) {
                log.debug(err);
                res.send(500, err);
            });
    },
    // ## Find
    // get map data
    find : function (req, res) {
        MapService.find(req.body, req.session.user)
            .then(function (response) {
               res.send(200, response);
           })
           .catch(function (err) {
               log.debug(err);
               res.send(500, err);
           });
    },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MapController)
   */
  _config: {}


};
