'use strict';
var express = require('express');
var fs = require('fs');
var config = require('config');
var mongoose = require('mongoose');
var bootstrap = require('./bootstrap');
var middleware = require('./middleware');
var session = require('express-session');
var P = require('bluebird');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var routeloader = require('express-routeloader');
var server;
var compression = require('compression');
var app = express();
var cacheManifest = fs.readFileSync('app/sentia.appcache') + '#' + Math.random();

// app.use(session({secret: 'alskjdflakjd'}));
app.use(compression());
app.use(session({
  store: new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
    prefix: 'session'
  }),
  secret: 'x9i4nmmLHDHaeM'
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/sentia.appcache", function(req, res){
  if (config.environment === 'dev') {
    res.send();
  }
  res.header("Content-Type", "text/cache-manifest");
  res.end(cacheManifest);
});
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
