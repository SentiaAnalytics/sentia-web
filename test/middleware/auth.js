'use strict';
var chai = require('chai'),
  E = require('express-http-errors'),
  target = require('../../middleware/auth'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Middleware - Auth', function () {
  describe('when calling auth without a session', function() {
    describe('where url is /session/authenticate', function() {
      var req = {
        session : {},
        url : '/api/session/authenticate'
      },
      next = sinon.spy();
      before(function () {
        target(req, null, next);
      });

      it('should call next once', function () {
        next.calledOnce.should.equal(true);
      });

      it('should call next with no args', function () {
        next.args[0].length.should.equal(0);
      });
    });

    describe('when calling auth with a session', function() {
      var req = {
        session : {},
        url : ''
      },
      next = sinon.spy();
      before(function () {
        target(req, null, next);
      });

      it('should call next once', function () {
        next.calledOnce.should.equal(true);
      });

      it('should call next with a single arg', function () {
        next.args[0].length.should.equal(1);
        next.args[0][0].should.eql(new E.NotAuthorizedError('You must login to perform this action.'));
      });
    });
  });
  describe('when calling auth with a session', function() {
    var req = {
      session : {
        user : 'user'
      },
      url : ''
    },
    next = sinon.spy();
    before(function () {
      target(req, null, next);
    });

    it('should call next once', function () {
      next.calledOnce.should.equal(true);
    });

    it('should call next with no args', function () {
      next.args[0].length.should.equal(0);
    });
  });
});
