'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import churnRateStore from '../index';
import cameraListContainer from '../../cameraListContainer';
import http from '../../../services/http';
import jsonResponse from './data/response.json';

describe('churnRateStore', function () {
  before(setup);
  after(teardown);
  beforeEach(function () {
    cameraListContainer.observable.onNext([]);
    churnRateStore.observable.onNext([]);
  });

  it('should not update if no cameras has counters', function () {
      cameraListContainer.observable.onNext([{_id: '1'},{_id: '2'}]);
      expect(churnRateStore.observable.getValue()).to.eql([]);
  });

  it('should get people in for all cameras with a counter', function () {
    cameraListContainer.observable.onNext([{counter: true}]);
    expect(churnRateStore.observable.getValue()).to.eql(jsonResponse);
  });

});

function setup () {
  sinon.stub(http, 'get', function () {
    return rx.Observable.of(jsonResponse);
  });
}

function teardown () {
  http.get.restore();
}
