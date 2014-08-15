'use strict';
var should = require('chai').should(),
  sinon = require('sinon'),
  target = require('../../services/errorHandler');

describe('errorHandler', function() {
  var res, next;
  before(function () {
    res = {
      send : sinon.spy()
    };
    next = sinon.spy();
  });

  describe('when calling without an error', function() {
    before(function () {
      target(null, null, res, next);
    });

    it('should call next once', function () {
      next.calledOnce.should.equal(true);
      next.args[0].length.should.equal(0);
    });

    it('should not call res.send', function () {
      res.send.called.should.equal(false);
    });

    after(function () {
      res.send.reset();
      next.reset();
    });
  });
  describe('when calling without an error code', function() {
    before(function () {
      target(new Error('ARGH'), null, res, next);
    });

    it('should call res.send once', function () {
      res.send.calledOnce.should.equal(true);
      res.send.args[0][0].should.equal(500);
      res.send.args[0][1].should.equal('Internal Server Error');

    });

    it('should not call next', function () {
      next.called.should.equal(false);
    });

    after(function () {
      res.send.reset();
      next.reset();
    });

  });
  describe('when calling with an error code and message', function() {
    before(function () {
      target({code : 404, message : 'resource not found'}, null, res, next);
    });

    it('should call res.send once', function () {
      res.send.calledOnce.should.equal(true);
      res.send.args[0][0].should.equal(404);
      res.send.args[0][1].should.equal('resource not found');

    });

    it('should not call res.send', function () {
      next.called.should.equal(false);
    });

    after(function () {
      res.send.reset();
      next.reset();
    });

  });

});
