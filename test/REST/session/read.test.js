  'use strict';
var chai = require('chai'),
  helper = require('../helper'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('/session/read', function () {
  describe('when logged in', function() {
    var promise;
    before(function () {
      return helper.session.authenticate({email : 'user@example.com', password : 'password'})
        .then(function (r) {
          r.should.have.property('statusCode', 200);
        });
    });

    before(function () {
      promise = helper.session.read();
    });

    it('should return 200', function () {
      return promise.should.eventually.have.property('statusCode', 200);
    });

    it('should return the session object', function () {
      return promise.should.eventually.have.property('body')
        .should.become({ user : helper.dummyUser});
    });
  });
  describe('when not logged in', function() {
    var res;
    before(function () {
      return helper.session.delete()
        .then(function () {
          res = helper.session.read();
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
