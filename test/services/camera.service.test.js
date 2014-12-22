'use strict';
var chai = require('chai'),
  should = chai.should(),
  rewire = require('rewire'),
  sinon = require('sinon'),
  target = rewire('../../services/cameras.service');
chai.use(require('chai-as-promised'));

describe('sanitizeQuery',function () {
  var sanitize = target.__get__('sanitizeQuery');
  it('should convert store and _id to objectIds', function () {
    var q1 = {
      store : 1,
      _id : 2
    },
      q2 = sanitize(q1);

    q2.should.have.property('store');
    q2.store.should.be.an('object');
    q2.should.have.property('_id');
    q2._id.should.be.an('object');
  });
});
