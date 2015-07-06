'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import posStore from '../index';
import startDateStore from '../../startDateStore';
import endDateStore from '../../endDateStore';
import storeStore from '../../storeStore';
import jsonResponse from './data/jsonResponse.json';

describe('posStore', function () {
  let subject;

  before(function () {
    sinon.stub(http, 'get', function () {
      return new rx.BehaviorSubject(jsonResponse);
    });
  });

  after(function () {
    http.get.restore();
  });

  afterEach(function () {
    if (subject) subject.dispose();
  });

  beforeEach(function () {
      storeStore.store.onNext(null);
      startDateStore.update.onNext(moment());
      endDateStore.update.onNext(moment());
      posStore.store.onNext([]);
  });

  it('should not update the store until all dependencies are met', function () {
    startDateStore.update.onNext(moment());
    expect(posStore.store.getValue()).to.eql([]);
  });

  it('should update the store whe dependencies are updated', function (done) {
    startDateStore.update.onNext(moment());
    endDateStore.update.onNext(moment());
    let spy = sinon.spy(onChange);

    subject = posStore.store.subscribe(spy, x => console.log('ERRRRRR', x))

    storeStore.store.onNext({
      id: 'bababa',
      name: 'store'
    });

    function onChange (posData) {
      if (R.isEmpty(posData)) return;

      expect(spy.calledTwice).to.equal(true);
      expect(R.pluck('revenue', posData)).to.eql(R.pluck('revenue',jsonResponse));
      done();
    }
  });
});
