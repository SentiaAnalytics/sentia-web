'use strict';
var chai = require('chai'),
  expect = chai.expect,
  target = require('../../middleware/company'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Middleware - company', function () {
  describe('when called without a company', function() {
    var req =  {
      session : {
        user : {}
      },
      query :{}
    },
    next = sinon.spy(),
    err;
    before(function () {
      try {
        target(req, null, next);
      } catch (e) {
        err = e;
      }
    });

    it('should not call next', function () {
      next.called.should.equal(false);
    });

    it('shoud throw a Forbidden error', function () {
      expect(err).to.exist;
      err.should.have.property('statusCode', 403);
    });

    it('should not add a company to query', function () {
      req.query.should.not.have.property('CompanyId');
    });

    after(function () {
      next.reset();
    });
  });

  describe('when called with a company', function() {
    var req =  {
      session : {
        user : {
          company : 1
        }
      },
      query :{}
    },
    next = sinon.spy(),
    err;
    before(function () {
      try {
        target(req, null, next);
      } catch (e) {
        err = e;
      }
    });

    it('should call next once', function () {
      next.calledOnce.should.equal(true);
    });

    it('shoud not throw an error', function () {
      expect(err).not.to.exist;
    });

    it('should add company to the query', function () {
      req.query.should.have.property('company');
    });
  });
});
