'use strict';
var express = require('express'),
  config = require('config'),
  mongoose = require('mongoose'),
  bootstrap = require('./bootstrap'),
  middleware = require('./middleware'),
  session = require('express-session'),
  redis = require('./services/redis.service'),
  P = require('bluebird'),
  RedisStore = require('connect-redis')(session),
  sessionStore = new RedisStore({client : redis, prefix : config.session.prefix}),
  bodyParser = require('body-parser'),
  routeloader = require('express-routeloader'),
  server,
  gzipStatic = require('connect-gzip-static'),
  app = express();



// app.use(session({secret: 'alskjdflakjd'}));

app.use(session({store : sessionStore, secret: 'alskjdflakjd'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(gzipStatic(__dirname + '/app'));

app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
  res.send('app/index.html');
});

// middleware
app.use(middleware.auth);
app.use(middleware.jsonQuery);
// load api routes
app.use(routeloader({prefix : '/api'}));
// error handling
app.use(require('./services/error.service'));

app.on('close', function () {
  require('./services/redis').quit();
});
// Exports the app so it can be run programtically
// calling node main.js runs this server
exports.start = function () {
  return bootstrap()
    .then(function () {
      return new P(function (resolve) {
        server = app.listen(config.port, resolve);
      });
    });
};
exports.stop = function () {
  if (!server) {
    return new P.resolve('Server not running');
  }
  return new P(function (resolve) {
    mongoose.connection.close(function () {
      server.close(function () {
        return resolve();
      });
    });
  });
};
