'use strict';
var chai = require('chai'),
  rewire = require('rewire'),
  sinon = require('sinon'),
  target = rewire('../../services/pos.service');
chai.use(require('chai-as-promised'));

describe('setTable',function () {
  var setTable = target.__get__('setTable');

  it('should set the from property to pos', function () {
    var query = setTable({});
    query.should.have.property('from', 'pos');
  });
});
