'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import http from '../../../services/http';
import cameraListContainer from '../';
import storeContainer from '../../storeContainer';
import cameraList from './data/cameraList';

let shouldHttpFail = false;

describe('cameraListContainer', function () {
  before(setup);

  beforeEach(function () {
    storeContainer.observer.onNext(null);
    cameraListContainer.observable.onNext([]);
  });

  after(teardown);

  describe('test', function () {


  it('should fetch a new list when the store is changed', function () {
    shouldHttpFail = false;
    storeContainer.observable.onNext({
      _id: '123123',
      name: 'store'
    });
    expect(cameraListContainer.observable.getValue()).to.eql(cameraList);
  });

  it('should catch http errors', function () {
    shouldHttpFail = true;
    storeContainer.observable.onNext({
      _id: '123123',
      name: 'store'
    });
    expect(cameraListContainer.observable.getValue()).to.eql([]);
    expect(cameraListContainer.error.getValue()).to.eql({status: 500, message: 'Internal Server Error'});
  });

  });
});

function setup () {
  sinon.stub(http, 'get', function (url) {
    if (shouldHttpFail) return rx.Observable.throw({status: 500, message: 'Internal Server Error'});
    return rx.Observable.of(cameraList);
  });
}

function teardown () {
  http.get.restore();
}
