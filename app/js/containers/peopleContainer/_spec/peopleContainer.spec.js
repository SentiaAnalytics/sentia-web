'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import peopleContainer from '../index';
import startDateContainer from '../../startDateContainer';
import endDateContainer from '../../endDateContainer';
import cameraListContainer from '../../cameraListContainer';
import jsonResponse from './data/jsonResponse.json';

let shouldHttpFail = false;
describe('peopleContainer', function () {
  let subject;

  before(setup);
  after(teardown);

  beforeEach(function () {
      startDateContainer.observer.onNext(moment());
      endDateContainer.observer.onNext(moment());
      cameraListContainer.observable.onNext([]);
      peopleContainer.observable.onNext([]);
  });

  it('should not update the store until all dependencies are met', function () {
    expect(peopleContainer.observable.getValue()).to.eql([]);
  });

  it('should update the store whe dependencies are updated', function () {

    cameraListContainer.observable.onNext([{
      counter: 'entrance'
    }]);

    let peopleData = peopleContainer.observable.getValue();
    expect(R.pluck('people', peopleData)).to.eql(R.pluck('people',jsonResponse));
  });

  it.skip('should catch http errors', function () {
    shouldHttpFail = true;
    let peopleData = peopleContainer.observable.getValue();
    let error = peopleContainer.error.observable.getValue();
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
