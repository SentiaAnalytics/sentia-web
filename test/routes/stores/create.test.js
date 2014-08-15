'use strict';
var should = require('chai').should(),
  sinon = require('sinon'),
  target = require('../../../routes/stores/create.js');

describe('/stores/create', function() {
  var res, req;
  before(function () {
    req = {
      body : {
        hello : 'world'
      }
    };
    res = {
      send:sinon.spy()
    };
    target(req, res);
  });

  it('should call res.send', function () {
    res.send.calledOnce.should.equal(true);
  });

  it('should return the body', function () {
    res.send.args[0][0].should.eql(req.body);
  });
});
