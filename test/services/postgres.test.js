'use strict';
var chai = require('chai'),
  should = chai.should(),
  target = require('../../services/postgres.js');

chai.use(require('chai-as-promised'));

describe('Postgres', function() {
  it('should have dbConfig', function () {
    target.dbConfig.should.eql(require('config').postgres);
  });

  describe('when requesting db version', function() {
    var promise;
    before(function () {
      promise = target.query('SELECT version();');
    });

    it('should resolve the promise', function () {
      return promise.should.eventually.be.fulfilled;
    });

  });
});
