'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var waiting = require('../../../app/js/filters/waiting.filter')();
chai.use(require('chai-as-promised'));


describe('waiting filter', function() {
  it('should return the input value if not null/undefined', function () {
    var result = waiting('YO');
    expect(result).to.be.equal('YO');
  });
  it('should return  " ... " if the input value is null', function () {
    var result = waiting(null);
    expect(result).to.be.equal(' ... ');
  });
  it('should return  " ... " if the input value is undefined', function () {
    var result = waiting();
    expect(result).to.be.equal(' ... ');
  });
});
