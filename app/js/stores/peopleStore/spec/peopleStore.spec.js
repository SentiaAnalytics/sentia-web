'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import peopleStore from '../index';
import startDateStore from '../../startDateStore';
import endDateStore from '../../endDateStore';
import cameraListStore from '../../cameraListStore';
import jsonResponse from './data/jsonResponse.json';

let shouldHttpFail = false;
describe('peopleStore', function () {
  let subject;

  before(setup);
  after(teardown);

  beforeEach(function () {
      startDateStore.update.onNext(moment());
      endDateStore.update.onNext(moment());
      cameraListStore.store.onNext([]);
      peopleStore.store.onNext([]);
  });

  it('should not update the store until all dependencies are met', function () {
    expect(peopleStore.store.getValue()).to.eql([]);
  });

  it('should update the store whe dependencies are updated', function () {

    cameraListStore.store.onNext([{
      counter: 'entrance'
    }]);

    let peopleData = peopleStore.store.getValue();
    expect(R.pluck('people', peopleData)).to.eql(R.pluck('people',jsonResponse));
  });

  it.skip('should catch http errors', function () {
    shouldHttpFail = true;
    let peopleData = peopleStore.store.getValue();
    let error = peopleStore.error.getValue();
    expect(peopleData).to.eql([]);
    expect(error).to.equal('http error');
  });
});

function setup () {
  sinon.stub(http, 'get', function (url) {
    if(shouldHttpFail) return rx.Observable.throw('http error');
    return new rx.BehaviorSubject(jsonResponse);
  });
}

function teardown () {
  http.get.restore();
}
