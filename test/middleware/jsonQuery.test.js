'use strict';
var chai = require('chai'),
  should = chai.should(),
  sinon = require('sinon'),
  target = require('../../middleware/jsonQuery');

chai.use(require('chai-as-promised'));

describe('jsonQuery',function () {

  it('should call next if query has no json property', function () {
    var req = {
      query : {
        hello : 'world'
      }
    },
      next = sinon.spy();

    target(req, null, next);
    next.calledOnce.should.equal(true);
    next.args[0].length.should.equal(0);
    req.query.should.eql({hello:'world'});
  });
  it('should call next with an error if invalid json is passed', function () {
    var req = {
      query : {

        json : 'some not json stuff'
      }
    },
      next = sinon.spy();

    target(req, null, next);
    next.calledOnce.should.equal(true);
    next.args[0].length.should.equal(1);
    next.args[0][0].message.should.eql('Invalid json');
  });

   it('should replace the query with valid json', function () {
    var req = {
      query: {
        json : "{ \"hello\" : \"World\"}"
      }
    },
      next = sinon.spy();

    target(req, null, next);
    next.calledOnce.should.equal(true);
    next.args[0].length.should.equal(0);
    req.query.should.eql({hello: 'World'});
    
  });

});
