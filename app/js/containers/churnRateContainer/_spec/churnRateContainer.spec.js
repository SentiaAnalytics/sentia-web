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
    let camList = [
      {
        _id: '1',
        name: 'Camera 1',
        counter: true
      },
      {
        _id: '2',
        name: 'Camera 2',
      },
      {
        _id: '3',
        name: 'Camera 3',
        counter: true
      }
    ];

    let expectedResult = [
      {
        cam: 'Camera 1',
        people: 34
      },
      {
        cam: 'Camera 3',
        people: 123
      }
    ];
    cameraListContainer.observable.onNext(camList);
    expect(churnRateStore.observable.getValue()).to.eql(expectedResult);
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
