'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import posStore from '../index';
import dateStore from '../../dateStore';
import storeStore from '../../storeStore';
import jsonResponse from './data/jsonResponse.json';

describe('posStore', function () {
  let observer;

  before(function () {
    sinon.stub(http, 'get', function () {
      return new rx.BehaviorSubject(jsonResponse);
    });
  });

  after(function () {
    http.get.restore();
  });

  beforeEach(function () {
    dateStore.update.onNext(moment());
    storeStore.store.onNext(null);
  });

  afterEach(function () {
    if (observer) observer.dispose();
  });

  it('should not update the store until all dependencies are met', function () {
    dateStore.update.onNext(moment());
    expect(posStore.store.getValue()).to.equal(null);
  });

  it('should update the store whe dependencies are updated', function (done) {
    let spy = sinon.spy(onChange);
    observer = posStore.store.subscribe(spy);

    dateStore.update.onNext(moment());

    storeStore.store.onNext({
      id: 'bababa',
      name: 'store'
    });

    function onChange (posData) {
      if (!posData) return;

      expect(spy.calledTwice).to.equal(true);
      expect(posData).to.have.property('totalRevenue', 1377627.93);
      expect(posData).to.have.property('totalTransactions', 23258);
      done();
    }
  });
});
