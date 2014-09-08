'use strict';
var chai = require('chai'),
  should = chai.should(),
  target = require('../../services/UsersService'),
  models = require('../../models'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('UsersService:', function () {
  before(function () {
    sinon.stub(models.User, 'find', function (query) {
      return {email : 'user@example.com', password : 'hash'};
    });
    sinon.stub(models.User, 'findAll', function (query) {
      return [{email : 'user@example.com', password : 'hash'}];
    });
  });

  afterEach(function () {
    models.User.find.reset();
    models.User.findAll.reset();

  });
  after(function () {
    models.User.find.restore();
    models.User.findAll.restore();

  });

  describe('find', function() {
    it('should return a user with no password', function () {
      return target.find({company : 1})
        .then(function (result) {
          result.should.be.an.Array;
          result.should.contain({'email' : 'user@example.com'});
          models.User.find.calledOnce.should.equal(true);
          models.User.find.args[0].length.should.equal(1);
        });
    });
  });
  describe('read', function() {
    it('should return a promise for a single user', function () {
      return target.read({company : 1, id : 1})
        .then(function (result) {
          result.should.be.an.Object;
          result.should.eql({'email' : 'user@example.com'});
          models.User.find.calledOnce.should.equal(true);
          models.User.find.args[0].length.should.equal(1);
        });
    });
  });

  describe('_buildGetQuery', function () {
    it('should return a query when called with an id', function () {
      var result = target._buildGetQuery({id : 1, company : 1});
      var q =  {
        where : {
          id : 1,
          company : 1
        },
        offset : 0,
        limit : 0
      };
      console.log(result);
      result.should.eql(q);
    });

    it('should return a query when called with a query object', function () {
      var query = {
        company : 1,
        limit : 1,
        skip : 1,
        sort : 'name',

      };
      var result = target._buildGetQuery(query),
        q =  {
          where : {
            company : 1
          },
          order: 'name',
          limit : 1,
          offset : 1
        };
      result.should.eql(q);
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
