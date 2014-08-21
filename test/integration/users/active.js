'use strict';
var chai = require('chai'),
  helper = require('../helper/utils'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('/users/active', function () {
  before(helper.setup);
  after(helper.teardown);
  describe('when logged in', function() {
    var res;
    before(function () {
      return helper.login({email : 'user@example.com', password : 'password'})
        .then(function (r) {
          r.should.have.property('statusCode', 200);
          res = helper.get('/users/active')
            .then(function (r) {
              console.log(r.body);
              return r;
            });
        });
    });

    it('should return 200', function () {
      return res.should.eventually.have.property('statusCode', 200);
    });

    it('should return the user', function () {
      return res.should.eventually.have.property('body')
        .should.become(helper.user);
    });
  });
  describe('when not logged in', function() {
    var res;
    before(function () {
      delete helper.headers.cookie;
      res = helper.get('/users/active');
    });

    it('should return 200', function () {
      return res.should.eventually.have.property('statusCode', 401);
    });

    it('should return the user', function () {
      return res.should.eventually.have.property('body')
        .should.become({
          code : 401,
          message : 'You must login to perform this action.'
        });
    });
  });
});
