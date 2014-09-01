'use strict';
var chai = require('chai'),
  tv4 = require('tv4'),
  db = require('../../services/postgres'),
  target = require('../../routes/maps.js'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Routes - Maps:timeline', function () {
  describe('handler', function() {
    var dummyTimeline = [{
      hour : 1,
      count : 1
    }];
    before(function () {
      sinon.stub(db, 'query', function (query) {
        return [dummyTimeline];
      });
    });
    after(function () {
      db.query.restore();
    });
    it('should return the dummyTimeline when called with the right id', function () {
      target.timeline.handler({company : 1, cam : 1, from : 123456789, to : 987654321, group : 'hour'}).should.eventually.eql(dummyTimeline);
    });
  });

  describe('validtor', function() {
    it('should accept a query with only an id', function () {
      tv4.validate({cam : 1, from : 123, to : 456, group : 'hour'}, target.timeline.query)
        .should.equal(true, tv4.error);
    });

    it('should reject a query with additional properties', function () {
      tv4.validate({cam : 1, from : 123, to : 456, group : 'hour', extra : 'field'}, target.timeline.query)
        .should.equal(false);
    });
  });
});
