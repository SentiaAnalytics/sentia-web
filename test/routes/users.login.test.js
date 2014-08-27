'use strict';
var chai = require('chai'),
  expect = chai.expect,
  E = require('express-http-errors'),
  sinon = require('sinon'),
  when = require('when'),
  UsersService = require('../../services/UsersService'),
  target = require('../../routes/users.js');

describe('users.login', function() {
  var req = {
      session : {}
    }, promise;
  describe('when called with a valid login', function() {
    before(function () {
      sinon.stub(UsersService, 'login', function (credentials) {
        return when.resolve(credentials);
      });
      req.body = {
        email : 'user@example.com',
        password : 'password'
      };
        promise = target.login.handler(req);
    });
    it('should be awesome', function () {
      "awesome".should.equal('awesome');
    });

    it('should return a promise', function () {
      promise.should.be.fulfilled;
    });


    it('should set req.session.user', function () {
      req.session.user.should.eql(req.body);
    });

    it('should return the user', function () {
      promise.should.become(req.body);
    });

    after(function () {
      UsersService.login.restore();
      delete req.session.user;
    });
  });

  describe('when called with an invalid login', function() {
    before(function () {
      sinon.stub(UsersService, 'login', function (credentials) {
        return when.reject(new E.NotAuthorizedError('Invalid Login'));
      });
        promise = target.login.handler(req);
    });

    it('should reject the promise', function () {
      promise.should.be.rejectedWith(new E.NotAuthorizedError('stuff'));
    });


    it('should set req.session.user', function () {
      req.session.should.not.have.property('user');
    });

    after(function () {
      UsersService.login.restore();
    });
  });
});
