'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import posContainerFactory from '../posContainerFactory';
import jsonResponse from './data/jsonResponse.json';

let shouldHttpFail = false;
let disposable;
const store = new Rx.BehaviorSubject();
const startDate = new Rx.BehaviorSubject();
const endDate = new Rx.BehaviorSubject();
const helper = {
  filterInput: sinon.spy(x=> x),
  fetchData: sinon.spy(x => {
    if (shouldHttpFail) {
      return Rx.Observable.throw('http error');
    }
    return Rx.Observable.of(jsonResponse);
  }),
  parseNumbersAndDates: x => x
};
const createContainer = posContainerFactory(R.__,startDate, endDate, store);

describe('posContainer', function () {
  let subject;

  before(stubHttp);

  after(function () {
    http.get.restore();
  });

  beforeEach(function () {
    if (disposable) {
      disposable.dispose();
    }
    store.onNext(null);
    startDate.onNext(moment());
    endDate.onNext(moment());
    helper.filterInput.reset();
    helper.fetchData.reset();
  });

  it('should not update the store until all dependencies are met', function () {
    let posContainer = createContainer(helper);
    let spy = sinon.spy();
    disposable = posContainer.observable.subscribe(spy);
    expect(spy.calledOnce).to.equal(true, 'spy called');
  });

  it('should update the store whe dependencies are updated', function () {
    let posContainer = createContainer(helper);
    let spy = sinon.spy();
    disposable = posContainer.observable.subscribe(spy);
    store.onNext({_id: 1});
    expect(spy.callCount).to.equal(2, 'spy called twice');
    expect(helper.fetchData.callCount).to.equal(2, 'fetchData called once');
    expect(spy.args[0][0]).to.eql(jsonResponse);
  });

  it('should catch http errors', function () {

  });
});
function stubHttp () {
  sinon.stub(http, 'get', function (url) {
    if(shouldHttpFail) return Rx.Observable.throw('http error');
    return new Rx.BehaviorSubject(jsonResponse);
  });
}
