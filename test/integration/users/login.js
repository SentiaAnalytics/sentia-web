'use strict';
var chai = require('chai'),
  should = chai.should(),
  when = require('when'),
  helper = require('../helper/utils'),
  bcrypt = require('../../../services/bcrypt');

chai.use(require('chai-as-promised'));

describe('/users/login', function() {
  before(helper.setup);
  after(helper.teardown);
  describe('when logging in with a valid user', function() {
    var res;
    before(function () {
      var credentials = {
        email : 'user@example.com',
        password : 'password'
      };
      res = helper.post('/users/login', credentials);
    });

    it('should a resolved promise', function () {
      return res.should.be.fulfilled;
    });

    it('should return 200', function () {
      return res.should.eventually.have.property('statusCode', 200);
    });


    it('should return a user', function () {
      return res.should.eventually.have.property('body')
        .should.eventually.eql(helper.user);
    });

  });
  describe('when logging in with an invalid user', function() {
    var res, credentials;
    before(function () {
      credentials = {
        email : 'user@example.com',
        password : 'fake'
      };
      res = helper.login(credentials);
    });

    it('should a resolved promise', function () {
      return res.should.be.fulfilled;
    });


    it('should return 401', function () {
      return res.should.eventually.have.property('statusCode', 401);
    });

  });
});
