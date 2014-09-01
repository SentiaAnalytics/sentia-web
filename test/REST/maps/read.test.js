'use strict';
var chai = require('chai'),
  helper = require('../helper'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Maps - read', function () {
  it('should return a valid map if called correctly', function () {
    return helper.maps.read(1)
      .then(function (res) {
        res.should.have.property('body');
        res.body.should.eql(helper.dummyMap);
        res.should.have.property('statusCode', 200);
      });
  });
  it('should return a 404 if the map does not exist', function () {
    return helper.maps.read(2)
      .then(function (res) {
        res.should.have.property('statusCode', 404);
        res.should.have.property('body', 'Could not find map');
      });
  });
});
