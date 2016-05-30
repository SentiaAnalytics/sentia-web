// 'use strict';
// var gcloudstorage = require('../../services/gcloudstorage.service');
// var HTTPError = require('node-http-error');
// var middleware = require('../../middleware');
//
// exports.read = {
//   url : '/cameras/:cameraId/snapshot.jpg',
//   handler: function (req, res, next) {
//     var stream = gcloudstorage.getReadStream(req.params.company, 'cameras/' + req.params.cameraId + '/latest.jpg');
//     stream.pipe(res);
//     stream.on('error', function (err) {
//       next(err);
//     });
//   },
//   middleware : [middleware.read]
// };
//
// exports.create = {
//   url : '/cameras/:cameraId/snapshot',
//   handler: function (req, res, next) {
//     var stream = gcloudstorage.getWriteStream(req.session.company, 'cameras/' + req.params.cameraId + '/latest.jpg');
//     req.pipe(stream)
//       .on('end', function () {
//         res.status(201).end();
//       })
//       .on('error', next);
//   }
// };
