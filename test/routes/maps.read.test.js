'use strict';
var chai = require('chai'),
  tv4 = require('tv4'),
  db = require('../../services/postgres'),
  target = require('../../routes/maps.js'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Routes - Maps:read', function () {
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
      target.read.handler({company : 1, id : 1}).should.eventually.eql(dummyMap);
    });
  });

  describe('validtor', function() {
    it('should accept a query with only an id', function () {
      tv4.validate({id : 1}, target.read.params)
        .should.equal(true, tv4.error);
    });

    it('should reject an empty query', function () {
      tv4.validate({}, target.read.params)
        .should.equal(false, tv4.error);
    });

    it('should reject a query with additional properties', function () {
      tv4.validate({id : 1, extra : 'field'}, target.read.params)
        .should.equal(false, tv4.error);
    });
  });
});
