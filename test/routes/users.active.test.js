'use strict';
var chai = require('chai'),
  sinon = require('sinon'),
  target = require('../../routes/users');

describe('/users/active', function() {
  var req = {
      session : {}
    },
    res = {
      send : sinon.spy()
    },
    next = sinon.spy();

  before(function () {
    req.session.user = 'hey';
    target.active.handler(req, res, next);
  });

  it('should not call next', function () {
    next.called.should.equal(false);
  });

  it('should call next once with a 401', function () {
    res.send.calledOnce.should.equal(true);
    res.send.args[0][0].should.eql('hey');
  });

  after(function () {
    next.reset();
    res.send.reset();
  });

});
