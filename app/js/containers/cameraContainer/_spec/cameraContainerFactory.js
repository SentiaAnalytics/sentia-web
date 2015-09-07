'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import cameraContainerFactory from '../cameraContainerFactory';

const fetchData = (id) => {
  if (!id || typeof id !== 'string') {
    return Rx.Observable.empty();
  }

  return new Rx.BehaviorSubject({
    id: id,
    name: 'store'
  });
};

describe('cameraContainerFactory', function () {
  it('should fetch and emit a new store if a valid request is sent to update', function () {
    let cameraContainer = cameraContainerFactory({fetchData});
    let spy = sinon.spy();
    cameraContainer.observable.subscribe(spy);
    cameraContainer.observer.onNext('1234');
    expect(spy.calledOnce).to.equal(true);
    expect(spy.args[0][0]).to.eql({
      id : '1234',
      name: 'store'
    });
  });

  it('should filter invalid requests', function () {
    let cameraContainer = cameraContainerFactory({fetchData});
    let spy = sinon.spy();
    cameraContainer.observable.subscribe(spy);
    cameraContainer.observer.onNext({ id:'4321'});
    expect(spy.called).to.equal(false);
  });
});
