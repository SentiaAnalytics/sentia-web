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
  compression = require('compression'),
  app = express();



// app.use(session({secret: 'alskjdflakjd'}));
app.use(compression());
app.use(session({store : sessionStore, secret: 'alskjdflakjd'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/app'));

// middleware
app.use('/api', middleware.auth);
// load api routes
app.use((req, res, next) => {
  logger.info(req.method, req.url);
  next();
});
app.use(routeloader({prefix : '/api'}));
// error handling
app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});
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
        logger.log('info', 'server started on port ', config.port);
      });
    });
};
exports.stop = function () {
  console.log('stopping : ', server);
  if (!server) {
    return new P.resolve('Server not running');
  }
  console.log('stopping services');
  require('services/mysql.service').close();
  require('services/redis.service').end();
  return new P(function (resolve) {
    mongoose.connection.close(function () {
        process.exit(0);
      server.close(function () {
        return resolve();
      });
    });
  });
};
