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

let shouldHttpFail = false;
describe('posStore', function () {
  let subject;

  before(stubHttp);

  after(function () {
    http.get.restore();
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

  it('should update the store whe dependencies are updated', function () {
    storeStore.store.onNext({
      id: 'bababa',
      name: 'store'
    });
    let posData = posStore.store.getValue();

    expect(R.pluck('revenue', posData)).to.eql(R.pluck('revenue',jsonResponse));
  });

  it('should catch http errors', function () {
    shouldHttpFail = true;
    storeStore.store.onNext({
      id: 'bababa',
      name: 'store'
    });
    let posData = posStore.store.getValue();
    let error = posStore.error.getValue();
    expect(posData).to.eql([]);
    expect(error).to.equal('http error');
  });
});
function stubHttp () {
  sinon.stub(http, 'get', function (url) {
    if(shouldHttpFail) return rx.Observable.throw('http error');
    return new rx.BehaviorSubject(jsonResponse);
  });
}
