'use strict';
var argv = require('minimist')(process.argv.slice(2)),
  mongoose = require('mongoose');

require('../bootstrap/mongoose')
  .then(function  () {
    var models = require('../models'),
    camera, cameraObj;

    cameraObj = {
      name : argv.name,
      store : argv.store,
      company : argv.company
    };
    camera = new models.Camera(cameraObj);
    camera.savep()
      .then(function (camera) {
        console.log(camera);
        process.exit(0);
      });
  });
