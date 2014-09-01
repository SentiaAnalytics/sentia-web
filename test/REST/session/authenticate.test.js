'use strict';
var chai = require('chai'),
  should = chai.should(),
  when = require('when'),
  helper = require('../helper'),
  bcrypt = require('../../../services/bcrypt');

chai.use(require('chai-as-promised'));

describe('/session/authenticate', function() {
  // before(helper.setup);
  // after(helper.teardown);
  describe('when authenticating with a valid user', function() {
    var res;
    before(function () {
      var credentials = {
        email : 'user@example.com',
        password : 'password'
      };
      res = helper.session.authenticate(credentials);
    });

    it('should return a resolved promise', function () {
      return res.should.be.fulfilled;
    });

    it('should return 200', function () {
      return res.should.eventually.have.property('statusCode', 200);
    });


    it('should return a user', function () {
      return res.should.eventually.have.property('body')
        .should.eventually.eql(helper.dummyUser);
    });

  });
  describe('when authenticating with an invalid user', function() {
    var res;
    before(function () {
      var credentials = {
        email : 'fake@example.com',
        password : 'password'
      };
      res = helper.session.authenticate(credentials);
    });

    it('should return a resolved promise', function () {
      return res.should.be.fulfilled;
    });

    it('should return 200', function () {
      return res.should.eventually.have.property('statusCode', 404);
    });


    it('should return an error', function () {
      return res.should.eventually.have.property('body')
        .should.eventually.eql('User not found');
    });

  });
  describe('when authenticationg with an invalid password', function() {
    var res, credentials;
    before(function () {
      credentials = {
        email : 'user@example.com',
        password : 'fake'
      };
      res = helper.session.authenticate(credentials);
    });

    it('should return a resolved promise', function () {
      return res.should.be.fulfilled;
    });

    it('should return 401', function () {
      return res.should.eventually.have.property('statusCode', 401);
    });

  });
});
