'use strict';
var chai = require('chai'),
  db = require('../../services/postgres'),
  when = require('when'),
  target = require('../../services/CamerasService'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('CameraService', function () {
  describe('_buildGetQuery', function() {
    var result;
    before(function () {
      var query = {
        company : 1,
        store : 1,
        order : 'name',
        limit : 10,
        skip : 1
      };
      result = target._buildGetQuery(query);
    });

    it('should return a query', function () {
      result.should.equal('SELECT * FROM "camera" WHERE (company = 1) AND (store = 1) ORDER BY name ASC LIMIT 10 OFFSET 1');
    });
  });
  describe('getFirstResult', function() {
    var output;
    before(function () {
      var input = ['stuff'];
      output = target._getFirstElement(input);
    });

    it('should return the first element', function () {
      output.should.equal('stuff');
    });
  });
  describe('find', function() {
    var result, dummyCamera;
    before(function () {
      dummyCamera = {
        id :1,
        name : 'Camera 1',
        store : 1,
        company : 1
      };
      sinon.stub(db, 'query', function (query) {
        return when.resolve([dummyCamera]);
      });
    });
    before(function () {
      var query = {
        company : 1,
        store : 1,
        order : 'name',
        limit : 10,
        skip : 1
      };
      result = target.find(query);
    });

    it('should return a list of cameras', function () {
      result.should.eventually.be.an.Array;
    });


    it('should have the right object', function () {
      result.should.eventually.contain(dummyCamera);
    });

    after(function () {
      db.query.restore();
    });
  });
  describe('read', function() {
    var result, dummyCamera;
    before(function () {
      dummyCamera = {
        id :1,
        name : 'Camera 1',
        store : 1,
        company : 1
      };

      sinon.stub(db, 'query', function (query) {
        return when.resolve(dummyCamera);
      });
    });
    before(function () {
      var query = {
        company : 1,
        store : 1
      };
      result = target.read(query);
    });

    it('should have the right object', function () {
      result.should.eventually.eql(dummyCamera);
    });

    after(function () {
      db.query.restore();
    });
  });
});
