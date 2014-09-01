'use strict';
var chai = require('chai'),
  expect = chai.expect,
  tv4 = require('tv4'),
  db = require('../../services/postgres'),
  when = require('when'),
  target = require('../../routes/cameras'),
  middleware = require('../../middleware'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Routes - Cameras:read', function () {
  var req, promise, dummyCamera;
  it('when fetching a specific camera', function () {
    target.find.middleware.should.contain(middleware.company);
  });
  before(function () {
    dummyCamera = {
      name : 'camera 1',
      store : 1,
      company : 1
    };
    sinon.stub(db, 'query', function () {
      return when.resolve([dummyCamera]);
    });
  });
  before(function () {
    req = {
      query : {
        company : 1,
        store : 1,

      }
    };
      promise = target.read.handler(req);
  });

  after(function () {
    db.query.restore();
  });

  it('should fulfille the promise', function () {
   return promise.should.be.fulfilled;
  });

  it('should return a camera', function () {
    promise.should.become(dummyCamera);
  });
  describe('validations', function() {
    it('should accept a valid request', function () {
      var params =  {
        id : 1
      };
      tv4.validate(params, target.read.params)
        .should.equal(true);
    });
    it('should reject additional fields', function () {
      var params =  {
        name :'name',
        extras : 1
      };
      tv4.validate(params, target.read.params)
        .should.equal(false);
    });
    it('should reject if missing fields', function () {
      var params =  {
      };
      tv4.validate(params, target.read.params)
        .should.equal(false);
    });
  });

});
