'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var dkNumber = require('../../../app/js/filters/dkNumber.filter')();
chai.use(require('chai-as-promised'));


describe('dkNumber filter', function() {
  it('should return the input value if NaN', function () {
    var result = dkNumber('YO');
    expect(result).to.be.equal('YO');
  });
  it('should round to the specified decimal point', function () {
    var result = dkNumber(1.234, 1);
    expect(result).to.be.equal(1.2);
  });
  it('should round to the second decimal point if unspecified', function () {
    var result = dkNumber(1.2345);
    expect(result).to.be.equal(1.23);
  });
});
