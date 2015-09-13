'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import http from '../../../services/http';
import cameralistContainerFactory from '../cameralistContainerFactory';

let shouldHttpFail = false;

const httpFail = (err) => Rx.Observable.throw(err);
const httpSuccess = (response) => Rx.Observable.of(response) ;
const httpMock = {
  get: sinon.spy((query) => shouldHttpFail? httpFail('Error'):  httpSuccess([1, 2, 3, 4]))
};
const createContainer = cameralistContainerFactory(httpMock);

describe('cameraListContainerFactory', function () {
  beforeEach(() => httpMock.get.reset());

  it('should fetch a list of cameras when the store updates', function () {
    let store = new Rx.Subject();
    let cameralistContainer = createContainer(store);
    let spy = sinon.spy();
    cameralistContainer.observable.subscribe(spy);
    store.onNext({_id:'123'});
    expect(httpMock.get.calledOnce).to.equal(true);
    expect(httpMock.get.args[0][0]).to.equal('/api/cameras?store=123');
    expect(spy.calledOnce).to.equal(true);
    expect(spy.args[0][0]).to.eql([1, 2, 3, 4]);
  });

  it('should catch errors in error subject', function () {
    shouldHttpFail = true;
    let store = new Rx.Subject();
    let cameralistContainer = createContainer(store);
    let spy = sinon.spy();
    let errorspy = sinon.spy();
    cameralistContainer.observable.subscribe(spy);
    cameralistContainer.error.subscribe(errorspy);
    store.onNext({_id:'123'});
    expect(httpMock.get.calledOnce).to.equal(true);
    expect(spy.called).to.equal(false);
    expect(errorspy.calledOnce).to.equal(true);
    expect(errorspy.args[0][0]).to.equal('Error');
  });
});
