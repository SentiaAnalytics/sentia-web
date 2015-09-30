'use strict';
import '../../../globals';
import assert from 'assert';
import sinon from 'sinon';
import heatContainerFactory from '../heatContainerFactory';

const startDate = new Bacon.Bus();
const endDate = new Bacon.Bus();
const camera = new Bacon.Bus();
const httpMock = {
  get: sinon.spy((url) => Bacon.once([{x:1, y:2, heat: 2.5}]))
};
let dispose;

describe('heatContainerFactory', function () {
  beforeEach(() => {
    startDate.push(moment('2015-01-01'));
    endDate.push(moment('2015-02-01'));
    camera.push({_id:1});
    httpMock.get.reset();
  });
  afterEach(() => dispose && dispose());

  it('should not update until all dependencies are met', function () {
    const spy = sinon.spy();
    const heatContainer = heatContainerFactory(httpMock, startDate, endDate, camera);
    camera.push(null);
    dispose = heatContainer.observable.onValue(spy);

    assert.equal(httpMock.get.called, false, 'should not call http');
    assert.equal(spy.called, false, 'should not call subscriber');
  });

  it('should fetch heatmap data when all dependencies are met', () => {
    let spy = sinon.spy();
    let heatContainer = heatContainerFactory(httpMock, startDate, endDate, camera);
    dispose = heatContainer.observable.onValue(spy);

    startDate.push(moment('2015-01-01'));
    endDate.push(moment('2015-02-01'));
    camera.push({_id:1});

    assert.equal(httpMock.get.calledOnce, true, 'should call http.get once' + httpMock.get.callCount);
    assert.equal(httpMock.get.args[0][0], '/api/maps?from=2015-01-01&to=2015-02-01&camera=1', 'should call http.get with correct url');
    assert.equal(spy.calledOnce, true, 'should call the subscriber once');
    assert.deepEqual(spy.args[0][0], [{x:1, y:2, heat: 2.5}], 'should call the subscriber with a valid response');
  });
});
