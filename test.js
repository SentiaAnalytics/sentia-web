'use strict';
var should = require('should'),
  when = require('when'),
  sinon = require('sinon');

// chai.use(require('chai-as-promised'));

describe('promise test', function () {
  it('should break', function () {
    return when('input')
      .then(function (input) {
        input.should.equal(5);
      });
  });
});
