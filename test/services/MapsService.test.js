'use strict';
var chai = require('chai'),
  target = require('../../services/MapsService'),
  db = require('../../services/postgres'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('MapService', function () {
  describe('_buildReadQuery', function() {
    it('should return a SQL query when called', function () {
      var query = target._buildReadQuery({
        id : 1,
        company : 1
      });
      query.should.equal('SELECT * FROM "map" WHERE (id = 1) AND (company = 1)');
    });
  });

  describe('getFirstElement', function() {
    it('should return the first element', function () {
      target._getFirstElement([1]).should.equal(1);
    });
  });

});
