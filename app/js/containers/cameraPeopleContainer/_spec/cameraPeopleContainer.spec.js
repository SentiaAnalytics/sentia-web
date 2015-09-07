'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import cameraPeopleContainerFactory from '../cameraPeopleContainerFactory';
import jsonResponse from './data/jsonResponse.json';
import helper from '../helper';

const startDate = new Rx.Subject();
const endDate = new Rx.Subject();
const camera = new Rx.Subject();
const cameraPeopleContainer = cameraPeopleContainerFactory(startDate, endDate, camera, helper);
let shouldHttpFail = false;
describe('cameraPeopleContainer', function () {
  let subject;

  before(setup);
  after(teardown);

  beforeEach(function () {
      startDate.onNext(moment());
      endDate.onNext(moment());
      camera.onNext([]);
      cameraPeopleContainer.observable.onNext([]);
  });

  it('should not update the store until all dependencies are met', function () {
    expect(cameraPeopleContainer.observable.getValue()).to.eql([]);
  });

  it('should update the store whe dependencies are updated', function () {

    camera.onNext({ _id : 1 });
    let peopleData = cameraPeopleContainer.observable.getValue();
    expect(R.pluck('people', peopleData)).to.eql(R.pluck('people',jsonResponse));
  });

  it.skip('should catch http errors', function () {
    shouldHttpFail = true;
    let peopleData = cameraPeopleContainer.observable.getValue();
    let error = cameraPeopleContainer.error.observable.getValue();
    expect(peopleData).to.eql([]);
    expect(error).to.equal('http error');
  });
});

function setup () {
  sinon.stub(http, 'get', function (url) {
    if(shouldHttpFail) return Rx.Observable.throw('http error');
    return new Rx.BehaviorSubject(jsonResponse);
  });
}

function teardown () {
  http.get.restore();
}
