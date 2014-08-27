'use strict';
var chai = require('chai'),
  expect = chai.expect,
  db = require('../../services/postgres'),
  when = require('when'),
  target = require('../../routes/stores/cameras'),
  middleware = require('../../middleware'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Routes - Cameras', function () {
  var req, promise, dummyCamera;
  it('when fetching cameras', function () {
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
      promise = target.find.handler(req);
  });

  after(function () {
    db.query.restore();
    });

   it('should fulfille the promise', function () {
     return promise.should.be.fulfilled;
   });

  it('should return a camera', function () {
    promise.should.become([dummyCamera]);
  });

});
