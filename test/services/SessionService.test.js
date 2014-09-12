'use strict';
var chai = require('chai'),
  sinon = require('sinon'),
  bcrypt = require('../../services/bcrypt.js'),
  when = require('when'),
  models = require('../../models'),
  target = require('../../services/SessionService.js');

chai.use(require('chai-as-promised'));

describe('SessionService', function() {
  describe('_validatePassword', function() {
    describe('when useing a valid password', function() {
      // body...
      var promise, hash;
      before(function () {
        var password = 'password';
        return bcrypt.hash(password)
          .then(function (h) {
            hash = h;
            promise = target._validatePassword(password, {password : hash});
          });
      });

      it('shoud validate the password', function () {
        return promise.should.become({password : hash});
      });
    });
    describe('when useing a valid password', function() {
      // body...
      var promise;
      before(function (done) {
        var password = 'password';
        bcrypt.hash(password)
          .then(function (hash) {
            promise = target._validatePassword('fake', {password : hash});
            done();
          });
      });
      it('should not be resolved', function () {
        return promise.should.not.be.fulfilled;
      });
      it('shoud return an error', function () {
        return promise.should.be.rejectedWith({code : 401, message : 'Invalid Password'});
      });
    });
  });
  describe('_removePrivateFields', function() {
    var result;
    before(function () {
      var user = {
        email : 'user@example.com',
        password : 'password'
      };
      result = target._removePrivateFields(user);
    });

    it('should not have a password', function () {
      result.should.eql({email : 'user@example.com'});
    });
  });
});
