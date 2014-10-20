'use strict';
var mongoose = require('./bootstrap/mongoose');

mongoose
  .then(function (data) {
    console.log('CONNECTED');
  });


