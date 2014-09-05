'use strict';
var chai = require('chai'),
  mongo = require('simple-mongo'),
  target = require('../../services/UsersService'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('UsersService:', function () {
  before(function () {
    sinon.stub(mongo, 'db', function (query) {
      return [{email : 'user@example.com', password : 'hash'}];
    });
  });
  afterEach(function () {
    mongo.db.reset();
  });
  after(function () {
    db.query.restore();
  });

  describe('find', function() {
    it('should return a user with no password', function () {
      return target.find({company : 1})
        .then(function (result) {
          result.should.be.an.Array;
          result.should.contain({'email' : 'user@example.com'});
          mong.calledOnce.should.equal(true);
          db.query.args[0].length.should.equal(1);
        });
    });
  });
  describe('read', function() {
    it('should return a promise for a single user', function () {
      return target.read({company : 1, id : 1})
        .then(function (result) {
          result.should.be.an.Object;
          result.should.eql({'email' : 'user@example.com'});
          db.query.calledOnce.should.equal(true);
          db.query.args[0].length.should.equal(1);
        });
    });
  });

  describe('_buildGetQuery', function () {
    it('should return a query when called with an id', function () {
      var result = target._buildGetQuery({id : 1, company : 1})
      result.should.equal('SELECT * FROM "user" WHERE (company = 1) AND (id = 1)');
    });

    it('should return a query when called with a query object', function () {
      var query = {
        company : 1,
        limit : 1,
        skip : 1,
        order : 'name',
        desc : true

      };
      var result = target._buildGetQuery(query);
      result.should.equal('SELECT * FROM "user" WHERE (company = 1) ORDER BY name DESC LIMIT 1 OFFSET 1');
    });
  });
  describe('_sanitizeUsers', function() {
    it('should delete the users password', function () {
      var result = target._sanitizeUsers([{email : 'user@example.com', password : 'passwrod'}])
      result.should.be.an.Array;
      result.should.have.property('length', 1);
      result[0].should.eql({email : 'user@example.com'});
    });
  });

  describe('_getFirstElement', function() {
    it('should return the first element of an array', function () {
      target._getFirstElement(['element'])
        .should.equal('element');
    });
  });
});
