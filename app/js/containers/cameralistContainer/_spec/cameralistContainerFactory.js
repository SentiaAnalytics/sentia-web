'use strict';
import '../../../globals';
import assert from 'assert';
import sinon from 'sinon';
import http from '../../../services/http';
import cameralistContainerFactory from '../cameralistContainerFactory';

let shouldHttpFail = false;

const httpFail = (err) => Bacon.once(new Bacon.Error(err));
const httpSuccess = (response) => Bacon.once(response) ;
const httpMock = {
  get: sinon.spy((query) => shouldHttpFail? httpFail('HTTP Error'):  httpSuccess([1, 2, 3, 4]))
};
const createContainer = cameralistContainerFactory(httpMock);

describe('cameraListContainerFactory', function () {
  beforeEach(() => httpMock.get.reset());

  it('should fetch a list of cameras when the store updates', function () {
    const store = new Bacon.Bus();
    let cameralistContainer = createContainer(store);
    let spy = sinon.spy();
    cameralistContainer.observable.onValue(spy);
    store.push({_id:'123'});
    assert.equal(httpMock.get.calledOnce, true, 'should call http.get once');
    assert.equal(httpMock.get.args[0][0], '/api/cameras?store=123', 'shoul call http.get with correct url')
    assert.equal(spy.calledOnce, true, 'should call the subscriber once');
    assert.deepEqual(spy.args[0][0],[1, 2, 3, 4])
  });

  it('should catch errors in error subject', function () {
    shouldHttpFail = true;
    const store = new Bacon.Bus();
    let cameralistContainer = createContainer(store);
    const spy = sinon.spy();
    const errorSpy = sinon.spy();

    cameralistContainer
      .observable
      .onValue(spy);

    cameralistContainer
      .observable
      .onError(errorSpy);

    store.push({_id:'123'});
    assert.equal(httpMock.get.calledOnce, true, 'should call http.get once');
    assert.equal(httpMock.get.args[0][0], '/api/cameras?store=123', 'shoul call http.get with correct url')
    assert.equal(spy.called, false, 'should not call the subscriber');
    assert.equal(errorSpy.calledOnce, true, 'should call the error handler once');
    assert.equal(errorSpy.args[0][0],'HTTP Error')

  });
});
