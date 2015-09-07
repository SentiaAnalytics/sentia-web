'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import helper from '../helper';
import peopleContainerFactory from '../peopleContainerFactory';
import jsonResponse from './data/jsonResponse.json';

let shouldHttpFail = false;
const startDate = new Rx.BehaviorSubject(moment());
const endDate = new Rx.BehaviorSubject(moment());
const cameralist = new Rx.BehaviorSubject([]);

const createContainer = peopleContainerFactory(R.__, startDate, endDate, cameralist);
describe('peopleContainer', function () {
  let disposable;
  before(setup);
  after(teardown);
  beforeEach(() => {
    if (disposable) {
      disposable.dispose();
    }
    startDate.onNext(moment());
    endDate.onNext(moment());
    cameralist.onNext([]);
  });

  it('should not update the store until all dependencies are met', function () {
    let spy = sinon.spy();
    let peopleContainer = createContainer(helper);
    startDate.onNext(null);
    disposable = peopleContainer.observable.subscribe(spy);
    cameralist.onNext([{_id:1}]);
    expect(spy.called).to.equal(false);
  });

  it('should update the store whe dependencies are updated', function () {
    let spy = sinon.spy();
    let peopleContainer = createContainer(helper);
    disposable = peopleContainer.observable.subscribe(spy);
    cameralist.onNext([{_id:1}]);
    expect(spy.calledOnce).to.equal(true);
    expect(R.map(R.prop('_id'),spy.args[0][0])).to.eql(R.map(R.prop('_id'), jsonResponse));
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
    if(shouldHttpFail) return Rx.Observable.throw('http error');
    return new Rx.BehaviorSubject(jsonResponse);
  });
}

function teardown () {
  http.get.restore();
}
