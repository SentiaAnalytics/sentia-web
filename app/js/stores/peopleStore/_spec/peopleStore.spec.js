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
      startDateStore.set(moment());
      endDateStore.set(moment());
      cameraListStore.onNext([]);
      peopleStore.onNext([]);
  });

  it('should not update the store until all dependencies are met', function () {
    expect(peopleStore.getValue()).to.eql([]);
  });

  it('should update the store whe dependencies are updated', function () {

    cameraListStore.onNext([{
      counter: 'entrance'
    }]);

    let peopleData = peopleStore.getValue();
    expect(R.pluck('people', peopleData)).to.eql(R.pluck('people',jsonResponse));
  });

  it.skip('should catch http errors', function () {
    shouldHttpFail = true;
    let peopleData = peopleStore.getValue();
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
