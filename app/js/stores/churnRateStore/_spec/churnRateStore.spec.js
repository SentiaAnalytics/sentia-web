'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import churnRateStore from '../index';
import cameraListStore from '../../cameraListStore';
import http from '../../../services/http';
import jsonResponse from './data/response.json';

describe('churnRateStore', function () {
  before(setup);
  after(teardown);
  beforeEach(function () {
    cameraListStore.onNext([]);
    churnRateStore.onNext([]);
  });

  it('should not update if no cameras has counters', function () {
      cameraListStore.onNext([{_id: '1'},{_id: '2'}]);
      expect(churnRateStore.getValue()).to.eql([]);
  });

  it.skip('should get people in for all cameras with a counter', function () {
    churnRateStore.set([{counter: true}]);
    expect(churnRateStore.getValue()).to.equal('lsldf');
  });

});

function setup () {
  sinon.stub(http, 'get', function () {
    return rx.Observable.from(jsonResponse);
  });
}

function teardown () {
  http.get.restore();
}
