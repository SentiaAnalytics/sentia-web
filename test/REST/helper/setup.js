'use strict';
var fs = require('fs'),
  path = require('path'),
  server = require('../../../server'),
  instance,
  sinon = require('sinon'),
  db = require('../../../services/postgres'),
  sqlite = require('./sqlite'),
  instance;

// stub out the query function, and load a fresh database
before(function () {
  sinon.stub(db, 'query', sqlite.query);
  var queries = fs.readFileSync(path.join(__dirname, './setup.sql'), {encoding : 'utf8'});
  return db.query(queries);
});

before(function () {
  return server.start()
    .then(function (i) {
      instance = i;
      return i;
    });
});

after(function (done) {
  db.query.restore();
  console.log('Closing server');
  return server.stop()
    .then(function () {
      console.log('server closed');
      sqlite.close();
      done();
    });¨
  });
});
