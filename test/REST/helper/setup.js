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

before(function (done) {
  instance = server.listen(3000, function () {
    done();
  });
});

after(function (done) {
  db.query.restore();
  console.log('Closing server');
  instance.close(function () {
    console.log('server closed');
    sqlite.close();
    done();
  });
});
