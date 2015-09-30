'use strict';
import '../../../globals';
import assert from 'assert';
import http from '../../../services/http';
import sinon from 'sinon';
import cameraContainerFactory from '../cameraContainerFactory';

let httpShouldFail = false;
const httpMock = {
  get: sinon.spy((url) => {
    if (httpShouldFail) {
      return Bacon.never();
    }
    return Bacon.once({
      _id: R.last(R.split('/', url)),
      name: 'store'
    });
  })
};

describe('cameraContainerFactory', function () {
  beforeEach(() => {
    httpMock.get.reset();
  });

  it('should fetch and emit a new store if a valid request is sent to update', function () {
    let cameraContainer = cameraContainerFactory(httpMock);
    let spy = sinon.spy();
    const expected = {
      _id : '1234',
      name: 'store'
    };
    cameraContainer.observable.onValue(spy);
    cameraContainer.observer.push('1234');
    assert.equal(httpMock.get.calledOnce, true, 'should call httpmock once');
    assert.equal(httpMock.get.args[0][0], '/api/cameras/1234', 'Should call Http.get with the right url');
    assert.equal(spy.calledOnce, true, 'Should call the subscriber once');
    assert.deepEqual(spy.args[0][0], expected, 'Should call subscriber with correct data');
  });
});
