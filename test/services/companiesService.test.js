'use strict';
var chai = require('chai'),
  sinon = require('sinon'),
  target = require('../../services/companiesService');

describe('CompaniesService', function() {
  var db;
  before(function () {
    db = require('../../services/postgres');
    sinon.stub(db, 'query', function (query) {
      return 'OK';
    });
  });

  describe('when calling find', function() {
    describe('with no arguments', function() {
      var query, data;
      before(function () {
        return target.find({})
          then(function (result) {
            data = result;
          });
        query = b.query.args[0][0];
      });

      it('should call db.query once with a query', function () {
        db.query.calledOnce.should.equal(true);
        query.should.equal('SELECT * FROM companies');
      });

      it('should return ok', function () {
        data.should.equal('OK');
      });
    });
  });
});
