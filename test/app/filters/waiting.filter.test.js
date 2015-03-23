'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var waiting = require('../../../app/js/filters/waiting.filter')();
chai.use(require('chai-as-promised'));


describe('waiting filter', function() {
  it('should return the input value if not a number', function () {
    var result = waiting('YO');
    expect(result).to.be.equal(' ... ');
  });
  it('should return  " ... " if the input value is NAN', function () {
    var result = waiting(NaN);
    expect(result).to.be.equal(' ... ');
  });
  it('should return the number if given a valid number', function () {
    var result = waiting(9);
    expect(result).to.be.equal(9);
  });
});
