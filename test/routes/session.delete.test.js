'use strict';
var chai = require('chai'),
  target = require('../../routes/session'),
  sinon = require('sinon');

chai.use(require('chai-as-promised'));

describe('Routes - Session', function () {
  var req = {
      session : {
        destroy : sinon.spy()
      }
    },
    res = {
      send : sinon.spy()
    },
    next = sinon.spy();

  before(function () {
    target.delete.handler(req, res, next);
  });

  it('should not call next', function () {
    next.called.should.equal(false);
  });

  it('should call res.send once with 200', function () {
    res.send.calledOnce.should.equal(true);
    res.send.args[0][0].should.equal(200);
  });

  it('should call session.destroy onc', function () {
    req.session.destroy.calledOnce.should.equal(true);
  });
});
