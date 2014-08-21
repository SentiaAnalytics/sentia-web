'use strict';
var express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  routeloader = require('express-routeloader'),
  app = express();


app.use(session({secret: 'alskjdflakjd'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));
app.get('/', function (req, res) {
  res.send('app/index.html');
});
app.use(require('./middleware/auth'));
// load api routes
app.use(routeloader({prefix : '/api'}));
// error handling
app.use(require('./services/errorHandler'));


// Exports the app so it can be run programtically
// calling node main.js runs this server
module.exports = app;
