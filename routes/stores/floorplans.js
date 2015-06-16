'use strict';
var gcloudstorage = require('../../services/gcloudstorage.service');
var HTTPError = require('node-http-error');
var middleware = require('../../middleware');

exports.read = {
  url : '/stores/floorplans/:floorId',
  handler: function (req, res, next) {
    var stream = gcloudstorage.getReadStream(req.params.company, 'floorplans/' +req.params.floorId +  '/latest.jpg');
    stream.pipe(res);
    stream.on('error', function (err) {
      next(err);
    });
  },
  middleware : [middleware.read]
};

exports.create = {
  url : '/stores/floorplans/:floorId',
  handler: function (req, res, next) {
    var stream = gcloudstorage.getWriteStream(req.session.company, 'floorplans/' +req.params.floorId +  '/latest.jpg');
    req.pipe(stream)
    .on('end', function () {
      res.status(201).end();
    })
    .on('error', next);
  }
};
