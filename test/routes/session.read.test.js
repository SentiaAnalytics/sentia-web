'use strict';
var chai = require('chai'),
  sinon = require('sinon'),
  target = require('../../routes/session');

describe('session.read', function() {
  var req = {
      session : {}
    },
    res = {
      send : sinon.spy()
    },
    next = sinon.spy();

  before(function () {
    req.session.user = 'hey';
    target.read.handler(req, res, next);
  });

  it('should not call next', function () {
    next.called.should.equal(false);
  });

  it('should call next once with a 401', function () {
    res.send.calledOnce.should.equal(true);
    res.send.args[0][0].should.eql({user : 'hey'});
  });

  after(function () {
    next.reset();
    res.send.reset();
  });

});
