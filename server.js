'use strict';
var express = require('express'),
  config = require('config'),
  session = require('express-session'),
  RedisStore = require('connect-redis')(session),
  sessionStore = new RedisStore(config.session),
  middleware = require('./middleware'),
  bodyParser = require('body-parser'),
  routeloader = require('express-routeloader'),
  app = express();


app.use(session({store : sessionStore, secret: 'alskjdflakjd'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
  res.send('app/index.html');
});

// middleware
app.use(middleware.auth);
// load api routes
app.use(routeloader({prefix : '/api'}));
// error handling
app.use(require('./services/errorHandler'));

app.on('close', function () {
  sessionStore.client.quit();
});
// Exports the app so it can be run programtically
// calling node main.js runs this server
module.exports = app;
