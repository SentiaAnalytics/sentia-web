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

  describe('_getFirstElement', function() {
    it('should return the first element', function () {
      target._getFirstElement([1]).should.equal(1);
    });
  });

  describe('_buildTimelineQuery', function() {
    it('should return a SQL query when called with all args', function () {
      var query = target._buildTimelineQuery({
        company : 1,
        from : 123456789,
        to : 987654321,
        cam : 1,
        group : 'hour'
      });
      query.should.equal('SELECT sum(1) as count, extract(hour from time) as hour FROM "map" WHERE (time BETWEEN \'1970-01-02 10:17:36\' AND \'1970-01-12 10:20:54\') AND (company = 1) AND (cam = 1) GROUP BY hour ORDER BY hour ASC');
    });
    it('should return a SQL query when called without arguments', function () {
      var query = target._buildTimelineQuery({
        company : 1
      });
      query.should.equal('SELECT sum(1) as count, extract(hour from time) as hour FROM "map" WHERE (time BETWEEN \'1970-01-01 00:00:00\' AND \'1970-01-01 00:00:00\') AND (company = 1) GROUP BY hour ORDER BY hour ASC');
    });
  });

});
