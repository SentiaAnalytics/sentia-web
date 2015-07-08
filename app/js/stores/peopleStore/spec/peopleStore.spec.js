'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import peopleStore from '../index';
import startDateStore from '../../startDateStore';
import endDateStore from '../../endDateStore';
import storeStore from '../../storeStore';
import jsonResponse from './data/jsonResponse.json';

let shouldHttpFail = false;
describe('peopleStore', function () {
  let subject;

  before(stubHttp);

  after(function () {
    http.get.restore();
  });

  beforeEach(function () {
      storeStore.store.onNext(null);
      startDateStore.update.onNext(moment());
      endDateStore.update.onNext(moment());
      peopleStore.store.onNext([]);
  });

  it('should not update the store until all dependencies are met', function () {
    startDateStore.update.onNext(moment());
    expect(peopleStore.store.getValue()).to.eql([]);
  });

  it.skip('should update the store whe dependencies are updated', function () {
    storeStore.store.onNext({
      id: 'bababa',
      name: 'store'
    });
    let peopleData = peopleStore.store.getValue();

    expect(R.pluck('people_in', peopleData)).to.eql(R.pluck('people_in',jsonResponse));
  });

  it.skip('should catch http errors', function () {
    shouldHttpFail = true;
    storeStore.store.onNext({
      id: 'bababa',
      name: 'store'
    });
    let peopleData = peopleStore.store.getValue();
    let error = peopleStore.error.getValue();
    expect(peopleData).to.eql([]);
    expect(error).to.equal('http error');
  });
});

function stubHttp () {
  sinon.stub(http, 'get', function (url) {
    if(shouldHttpFail) return rx.Observable.throw('http error');
    return new rx.BehaviorSubject(jsonResponse);
  });
}
