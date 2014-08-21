'use strict';
var server = require('../../../server'),
  fs = require('fs'),
  path = require('path'),
  sqlite = require('./sqlite'),
  instance;

// stub out the query function, and load a fresh database
before(function () {
  var queries = fs.readFileSync(path.join(__dirname, './setup.sql'), {encoding : 'utf8'});
  return sqlite.query(queries);
});

before(function (done) {
  instance = server.listen(3000, function () {
    done();
  });
});

after(function () {
  instance.close(function () {
    process.exit();
  });
});
