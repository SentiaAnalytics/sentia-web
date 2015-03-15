var camera = require('./models/camera');

camera.find({})
  .then(function (res) {
      console.log(res);
  });
