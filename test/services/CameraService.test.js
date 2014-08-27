'use strict';
var chai = require('chai'),
  db = require('../../services/postgres'),
  when = require('when'),
  target = require('../../services/CameraService'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('CameraService', function () {
  describe('getCameras', function() {
    var result;
    before(function () {
      sinon.stub(db, 'query', function (query) {
        return when.resolve(query);
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
      result = target._getCameras(query);
    });

    it('should return a query', function () {
      return result.should.eventually.equal('SELECT * FROM "cameras" WHERE (company = 1) AND (store = 1) ORDER BY name ASC LIMIT 10 OFFSET 1');
    });
    after(function () {
      db.query.restore();
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
      result = target._getCameras(query);
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
});
