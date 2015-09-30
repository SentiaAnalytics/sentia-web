'use strict';
import '../../../globals';
import assert from 'assert';
import sinon from 'sinon';
import queueContainerFactory from '../queueContainerFactory';
import response from './data/response.json';
import expected from './data/expected.json';
const mapTimeToString = R.map(R.evolve({time: time => time.format('YYYY-MM-DD')}));

const store = new Bacon.Bus();
const startDate = new Bacon.Bus();
const endDate = new Bacon.Bus();

const http = {
  get: sinon.spy(url => Bacon.once(response))
};
let dispose;
describe('queueContainerFactory', function () {
  beforeEach(() => http.get.reset())
  afterEach(() => dispose && dispose());

  it('should not update until all dependencies are met', function () {
    const queueContainer = queueContainerFactory(http, startDate, endDate, store);
    const spy = sinon.spy();
    dispose = queueContainer.observable.onValue(spy);

    store.push({_id:'123'});
    startDate.push(moment('2015-01-01'));

    assert.equal(spy.called, false, 'Should not call spy');
    assert.equal(http.get.called, false, 'Should not call http.get');
  });

  it('should fetch queue data when all dependencies are met', function () {
    const queueContainer = queueContainerFactory(http, startDate, endDate, store);
    const spy = sinon.spy();
    dispose = queueContainer.observable.onValue(spy);

    startDate.push(moment('2015-01-01'));
    endDate.push(moment('2015-01-05'));
    store.push({_id:'123'});
    let actual = mapTimeToString(spy.args[0][0]);

    assert.equal(http.get.calledOnce, true, `http.get called ${http.get.callCount} times with args ${http.get.args} `);
    assert.equal(http.get.args[0][0], '/api/stores/123/queues?from=2015-01-01&to=2015-01-05', 'should call http.get with the right url');
    assert.equal(spy.calledOnce, true, 'Should call spy once');
    assert.deepEqual(actual, expected, 'should return the right data');
  });
});
