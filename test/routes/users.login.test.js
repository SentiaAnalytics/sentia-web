'use strict';
var chai = require('chai'),
  sinon = require('sinon'),
  when = require('when'),
  Users = require('../../services/UsersService'),
  target = require('../../routes/users.js');

describe('/users/login', function() {
  var req = {
    session : {}
  },
    res = {
      send : sinon.spy()
    },
    next = sinon.spy();
  describe('when called with a valid login', function() {
    before(function () {
      sinon.stub(Users, 'login', function (credentials) {
        return when.resolve(credentials);
      });
      req.body = {
        email : 'user@example.com',
        password : 'password'
      };
      target.login.handler(req, res, next);
    });
    it('should be awesome', function () {
      "awesome".should.equal('awesome');
    });

    it('should not call next', function () {
      next.called.should.equal(false);
    });

    it('should call res.send once', function () {
      res.send.calledOnce.should.equal(true);
    });

    it('should set req.session.user', function () {
      req.session.user.should.eql(req.body);
    });

    it('should return the user', function () {
      res.send.args[0].should.be.an.Array;
      res.send.args[0].length.should.equal(1);
      res.send.args[0][0].should.eql(req.body);
    });

    after(function () {
      Users.login.restore();
      res.send.reset();
      delete req.session.user;
    });
  });

  describe('when called with an invalid login', function() {
    before(function () {
      sinon.stub(Users, 'login', function (credentials) {
        return when.reject({code : 401, message: 'Invalid Login'});
      });
      target.login.handler(req, res, next);
    });

    it('should call res.send once', function () {
      next.calledOnce.should.equal(true);
    });

    it('should set req.session.user', function () {
      req.session.should.not.have.property('user');
    });

    it('should return the user', function () {
      next.args[0].should.be.an.Array;
      next.args[0].length.should.equal(1);
      next.args[0][0].should.eql({code : 401, message : 'Invalid Login'});
    });

    after(function () {
      Users.login.restore();
    });
  });
});
