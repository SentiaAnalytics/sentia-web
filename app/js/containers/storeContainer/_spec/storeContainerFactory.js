'use strict';
import '../../../globals';
import assert from 'assert';
import sinon from 'sinon';
import storeContainerFactory from '../storeContainerFactory';

const http = {
  get: sinon.spy(url => Bacon.once({_id: '123', name:'store'}))
}
let dispose;

describe('StoresStore', function () {
  beforeEach(() => http.get.reset());
  afterEach(() => dispose && dispose());

  it('should fetch and emit a new store if a valid request is sent to update', function () {
    const storeContainer = storeContainerFactory(http);
    const spy = sinon.spy();
    dispose = storeContainer.observable.onValue(spy);
    storeContainer.observer.push('123');

    assert.equal(http.get.calledOnce, true, 'should call http.get once');
    assert.equal(http.get.args[0][0], '/api/stores/123', 'should call http.get with the right url');
    assert.equal(spy.calledOnce, true, 'should call subscriber once');
    assert.deepEqual(spy.args[0][0], {_id: '123', name: 'store'});
  });

});
