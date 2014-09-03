'use strict';
var chai = require('chai'),
  tv4 = require('tv4'),
  db = require('../../services/postgres'),
  target = require('../../routes/maps.js'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Routes - Maps:find', function () {
  describe('handler', function() {
    var dummyMap = {
      id : 1,
      cam : 1,
      company : 1,
      x : 1,
      y : 2,
      dx : 1,
      dy : 2,
      count : 1
    };
    before(function () {
      sinon.stub(db, 'query', function (query) {
        return [dummyMap];
      });
    });
    after(function () {
      db.query.restore();
    });
    it('should return the dummyMap when called with the right id', function () {
      var q = {
        company : 1,
        cam : 1,
        from : 123456789,
        to : 987654321
      };
      target.find.handler(q).should.eventually.contain(dummyMap);
    });
  });

  describe('validator', function() {
    it('should accept a query with all required fields', function () {
      var q = {
        cam : 1,
        from : 123456789,
        to : 987654321
      };
      tv4.validate(q, target.find.query)
        .should.equal(true, tv4.error);
    });

    it('should accept an empty query', function () {
      tv4.validate({}, target.find.query)
        .should.equal(true, tv4.error);
    });

    it('should reject a query with additional properties', function () {
      var q = {
        extra : 1,
        cam : 1,
        from : 123456789,
        to : 987654321
      };
      tv4.validate(q, target.find.query)
        .should.equal(false);
    });
  });
});
