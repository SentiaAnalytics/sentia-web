'use strict';
var gcloudstorage = require('../../services/gcloudstorage.service');
var HTTPError = require('node-http-error');
var logger = require('bragi');
var middleware = require('../../middleware');

exports.get = {
  url : '/cameras/:cameraId/snapshot',
  handler: function (req, res, next) {
    console.log('res.query');
    console.log(res.query);
    var stream = gcloudstorage.getReadStream(req.query.company, 'cameras/' + req.params.cameraId + '/latest.jpg');
    stream.pipe(res);
    stream.on('error', function (err) {
      next(err);
    });
  },
  middleware : [middleware.company]
};

exports.create = {
  url : '/cameras/:cameraId/snapshot',
  handler: function (req, res, next) {
    var stream = gcloudstorage.getWriteStream(req.query.company, 'cameras/' + req.params.cameraId + '/latest.jpg');
    req.pipe(stream)
      .on('end', function () {
        res.status(201).end();
      })
      .on('error', next);
  },
  middleware : [middleware.company]
};
