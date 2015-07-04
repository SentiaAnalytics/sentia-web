'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import posStore from '../index';
import dateStore from '../../dateStore';
import storeStore from '../../storeStore';

describe('posStore', function () {
  let observer;
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
    posStore.store.subscribe(spy);

    dateStore.update.onNext(moment());
    storeStore.store.onNext({
      name: 'store'
    });

    function onChange (posData) {
      if (!posData) return;

      expect(spy.calledTwice).to.equal(true);
      expect(posData).to.equal({
        revenue: 100,
        transactions: 10
      });

      done();
    }
  });
});
