  'use strict';
var chai = require('chai'),
  helper = require('../helper'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe.skip('users', function () {
  var user;
  describe('create', function () {
    it.skip('should create a new user if called correctly', function () {
      return helper.users.create({
        email : 'andreas@example.com',
        password : 'password'
      }).then(function (res) {
        res.should.have.property('statusCode', 201);
        res.body.should.have.property('email', 'andreas@example.com');
        res.body.should.not.have.property('password', res.body.password);
        user = res.body;
      });
    });
    it('should reject a user a users with an existing email',function () {
      return helper.users.create({
        email : 'andreas@example.com',
        password : 'password'
      }).then(function (res) {
        res.should.have.property('statusCode', 400);
        res.body.should.equal('A user with that email already exists');
      });
    });
  });
  describe('read / find', function () {
    it('should return a list of users', function () {
      return helper.users.find()
        .then(function (res) {
          res.should.have.property('statusCode', 200);
          res.body.list.should.be.an.Array;
        });
    });
  });
  describe('delete', function () {
    it('should delete a user when called with a valid id', function () {
        return helper.users.delete(user._id)
          .then(function (res) {
            res.should.have.propery('statusCode', 200);
          });
      });  
  }); 
});
