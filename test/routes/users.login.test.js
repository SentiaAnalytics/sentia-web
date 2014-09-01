'use strict';
var chai = require('chai'),
  expect = chai.expect,
  E = require('express-http-errors'),
  sinon = require('sinon'),
  tv4 = require('tv4'),
  when = require('when'),
  UsersService = require('../../services/UsersService'),
  target = require('../../routes/users.js');

describe('users.login', function() {
  it('should have a handler', function () {
    target.login.should.have.property('handler');
  });

  describe('validation', function() {
    it('should accept an email and password', function () {
      var cred = {
        email : 'user@example.com',
        password : 'password'
      };
      tv4.validate(cred, target.login.body)
        .should.equal(true);
    });

    it('should reject a missing password', function () {
      var cred = {
        email : 'user@example.com'
      };
      tv4.validate(cred, target.login.body)
        .should.equal(false);
    });
    it('should reject a missing email', function () {
      var cred = {
        password : 'password'
      };
      tv4.validate(cred, target.login.body)
        .should.equal(false);
    });
    it('should reject additional properties', function () {
      var cred = {
        email : 'user@example.com',
        password : 'password',
        extras : 1
      };
      tv4.validate(cred, target.login.body)
        .should.equal(false);
    });
  });
});
