'use strict';
var chai = require('chai'),
  should = chai.should(),
  sinon = require('sinon'),
  bcrypt = require('bcrypt-nodejs'),
  target = require('../../services/bcrypt.service');
chai.use(require('chai-as-promised'));

describe('compare',function () {
  this.timeout(5000);
  it.skip('should accept to hashes of a string', function () {
    return target.hash('Password')
      .then(target.compare.bind(this, 'Password'))
      .then(function (result) {
        should.equal(result, true);
      });
      
  });
});
