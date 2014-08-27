  'use strict';
var chai = require('chai'),
  helper = require('../helper'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('/users/active', function () {
  describe('when logged in', function() {
    var promise;
    before(function () {
      return helper.users.login({email : 'user@example.com', password : 'password'})
        .then(function (r) {
          r.should.have.property('statusCode', 200);
        });
    });

    before(function () {
      promise = helper.users.active();
    });

    it('should return 200', function () {
      return promise.should.eventually.have.property('statusCode', 200);
    });

    it('should return the user', function () {
      return promise.should.eventually.have.property('body')
        .should.become(helper.user);
    });
  });
  describe('when not logged in', function() {
    var res;
    before(function () {
      return helper.users.logout()
        .then(function () {
          res = helper.users.active();
        });
    });

    it('should return 200', function () {
      return res.should.eventually.have.property('statusCode', 401);
    });

    it('should return the user', function () {
      return res.should.eventually.have.property('body')
        .should.become("You must login to perform this action.");
    });
  });
});
