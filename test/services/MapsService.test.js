'use strict';
var chai = require('chai'),
  target = require('../../services/MapsService'),
  db = require('../../services/postgres'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('MapService', function () {
  var listQuery =  {
    company : 1,
    from : 123456789,
    to : 987654321,
    cam : 1,
    group : 'hour'
  };
  describe('_buildGetQuery', function() {
    it('should return a SQL query when called', function () {
      var query = target._buildGetQuery({
        from : 123456789,
        to : 987654321,
        cam : 1,
        company : 1
      });
      query.should.equal('SELECT * FROM "map" WHERE (time BETWEEN \'1970-01-02 10:17:36\' AND \'1970-01-12 10:20:54\') AND (company = 1) AND (cam = 1)');
    });
  });

  describe('_buildTimelineQuery', function() {
    it('should return a SQL query when called with all args', function () {
      var query = target._buildTimelineQuery(listQuery);
      query.should.equal('SELECT sum(1) as count, extract(hour from time) as hour FROM "map" WHERE (time BETWEEN \'1970-01-02 10:17:36\' AND \'1970-01-12 10:20:54\') AND (company = 1) AND (cam = 1) GROUP BY hour ORDER BY hour ASC');
    });

    it('should return a SQL query when called without arguments', function () {
      var query = target._buildTimelineQuery({
        company : 1
      });
      query.should.equal('SELECT sum(1) as count, extract(hour from time) as hour FROM "map" WHERE (time BETWEEN \'1970-01-01 00:00:00\' AND \'1970-01-01 00:00:00\') AND (company = 1) GROUP BY hour ORDER BY hour ASC');
    });
  });
  describe('find', function() {
    before(function () {
      sinon.stub(db, 'query', function (query) {
        return [{id: 1, x: 1, y: 1}];
      });
    });

    after(function () {
      db.query.restore();
    });

    it('should return a promise for a map', function () {
      return target.find(listQuery)
        .then(function (result) {
          result.should.be.an.Array;
          result.should.have.property('length', 1);
          result.should.contain({id:1, x:1, y:1});
        });
    });
  });

});
