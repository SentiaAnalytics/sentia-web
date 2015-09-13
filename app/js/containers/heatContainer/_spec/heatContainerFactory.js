'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import heatContainerFactory from '../heatContainerFactory';

const startDate = new Rx.BehaviorSubject(moment('2015-01-01'));
const endDate = new Rx.BehaviorSubject(moment('2015-02-01'));
const camera = new Rx.BehaviorSubject({id:1});
const http = {
  get: sinon.spy((url) => Rx.Observable.of(5))
};

describe('heatContainerFactory', function () {
  beforeEach(() => {
    startDate.onNext(moment('2015-01-01'));
    endDate.onNext(moment('2015-02-01'));
    camera.onNext({id:1});
    http.get.reset();
  });
  it('should not update until all dependencies are met', function () {
    let spy = sinon.spy();
    let heatContainer = heatContainerFactory(http, startDate, endDate, camera);
    camera.onNext(null);
    heatContainer.observable.subscribe(spy);

    expect(http.get.called).to.equal(false, 'should not call http');
    expect(spy.called).to.equal(false);
  });
});
