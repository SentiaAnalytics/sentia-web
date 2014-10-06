'use strict';
var chai = require('chai'),
  should = chai.should(),
  when = require('when'),
  helper = require('../helper'),
  bcrypt = require('../../../services/bcrypt');

chai.use(require('chai-as-promised'));

describe.skip('/session/authenticate', function() {
  it('should authenticate when receiving valid credentials', function () {
    var cred = {
      email : 'andreas@example.com',
      password : 'password'
    };
    return helper.session.authenticate(cred)
      .then(function (res) {
        res.should.have.property('statusCode', 200);
        res.body.should.have.property('email', 'andreas@senita.io');
        res.body.should.not.have.property('password');
      });
  });
});
