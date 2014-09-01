'use strict';
var chai = require('chai'),
  sinon = require('sinon'),
  bcrypt = require('../../services/bcrypt.js'),
  when = require('when'),
  db = require('../../services/postgres.js'),
  target = require('../../services/SessionService.js');

chai.use(require('chai-as-promised'));

describe('SessionService', function() {
  describe('_getUser', function () {
    var credentials, promise;
    before(function () {
      credentials = {
        email : 'user@example.com',
        password : 'password'
      };
      sinon.stub(db, 'query', function (query) {
          return when.resolve([query]);
      });
      promise = target._getUser(credentials);
    });
    after(function () {
      db.query.restore();
    });

    it('should become query', function () {
      return promise.should.eventually.equal('SELECT * FROM "user" WHERE (email = \'user@example.com\')');
    });
  });
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
      })
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
      result = target._removePrivateFields(user)
    });

    it('should not have a password', function () {
      result.should.eql({email : 'user@example.com'});
    });
  });
  describe('authenticated', function() {
    var dummyUser;
    before(function () {
      sinon.stub(db, 'query', function (string) {
        return bcrypt.hash('password')
          .then(function (hash) {
            dummyUser = {
              email : 'user@example.com',
              password : hash
            };
            return [dummyUser] ;
          });
      });
    });
    after(function () {
      db.query.restore();
    });

    describe('with a valid user', function() {
      var promise;
      before(function () {
        var user = {
          email : 'user@example.com',
          password : 'password'
        };
        promise = target.authenticate(user);
      });

      it('should be resolved', function () {
        return promise.should.be.fulfilled;
      });

      it('should not have a password field', function () {
        return promise.should.eventually.not.have.property('password');
      });
      it('should be resolved with the a user', function () {
        return promise.should.become({email : 'user@example.com'})
      });
    });
    describe('with an invalid user', function() {
      var promise;
      before(function () {
        var user = {
          email : 'user@example.com',
          password : 'passwrd'
        };
        promise = target.authenticate(user);
      });


      it('should not be resolved', function () {
        return promise.should.not.be.fulfilled;
      });

      it('should be rejected', function () {
        return promise.should.be.rejectedWith({code : 401, message : 'Invalid Pasword'})
      })
    });
  });
});
