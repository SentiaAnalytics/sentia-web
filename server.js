'use strict';
var express = require('express'),
  bodyParser = require('body-parser'),
  routeloader = require('express-routeloader'),
  app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(routeloader({}));
app.use(require('./services/errorHandler'));

// Exports the app so it can be run programtically
// calling node main.js runs this server
module.exports = app;
