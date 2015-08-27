'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import posContainer from '../index';
import {startDateContainer, endDateContainer} from '../../dateContainer';
import storeContainer from '../../storeContainer';
import jsonResponse from './data/jsonResponse.json';

let shouldHttpFail = false;
describe('posContainer', function () {
  let subject;

  before(stubHttp);

  after(function () {
    http.get.restore();
  });

  beforeEach(function () {
    storeContainer.observable.onNext(null);
    startDateContainer.observer.onNext(moment());
    endDateContainer.observer.onNext(moment());
    posContainer.observable.onNext([]);
  });

  it('should not update the store until all dependencies are met', function () {
    startDateContainer.observer.onNext(moment());
    expect(posContainer.observable.getValue()).to.eql([]);
  });

  it('should update the store whe dependencies are updated', function () {
    storeContainer.observable.onNext({
      _id: 'bababa',
      name: 'store'
    });
    let posData = posContainer.observable.getValue();

    expect(R.pluck('revenue', posData)).to.eql(R.pluck('revenue',jsonResponse));
  });

  it('should catch http errors', function () {
    shouldHttpFail = true;
    storeContainer.observable.onNext({
      _id: 'bababa',
      name: 'store'
    });
    let posData = posContainer.observable.getValue();
    let error = posContainer.error.getValue();
    expect(posData).to.eql([]);
    expect(error).to.equal('http error');
  });
});
function stubHttp () {
  sinon.stub(http, 'get', function (url) {
    if(shouldHttpFail) return Rx.Observable.throw('http error');
    return new Rx.BehaviorSubject(jsonResponse);
  });
}
