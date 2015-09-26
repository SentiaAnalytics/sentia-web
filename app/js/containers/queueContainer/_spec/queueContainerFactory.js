'use strict';
import '../../../globals';
import assert from 'assert';
import sinon from 'sinon';
import queueContainerFactory from '../queueContainerFactory';

const store = new Rx.Subject();
const startDate = new Rx.Subject();
const endDate = new Rx.Subject();

const http = {
  get: sinon.spy(url => {
      return Rx.Observable.of([{time: moment('2015-01-01').toDate().toString(), queue: 4}])
  })
}
describe('queueContainerFactory', function () {
  let disposable;
  beforeEach(() => {
    store.onNext(null);
    startDate.onNext(null);
    endDate.onNext(null);
    http.get.reset();
  });
  afterEach(()=> {
    if (disposable) disposable.dispose();
  });

  it('should not update until all dependencies are met', function () {
    const queueContainer = queueContainerFactory(http, startDate, endDate, store);
    const spy = sinon.spy();
    disposable = queueContainer.observable.subscribe(spy);

    store.onNext({_id:'123'});
    startDate.onNext(moment('2015-01-01'));

    assert.equal(spy.called, false, 'Should not call spy');
    assert.equal(http.get.called, false, 'Should not call http.get');
  });

  it('should fetch queue data when all dependencies are met', function () {
    const queueContainer = queueContainerFactory(http, startDate, endDate, store);
    const spy = sinon.spy();
    disposable = queueContainer.observable.subscribe(spy);

    store.onNext({_id:'123'});
    startDate.onNext(moment('2015-01-01'));
    endDate.onNext(moment('2015-01-02'));

    assert.equal(http.get.calledOnce, true, `http.get called ${http.get.callCount} times with args ${http.get.args} `);
    assert.equal(http.get.args[0][0], '/api/stores/123/queues?from=2015-01-01&to=2015-01-02', 'should call http.get with the right url');
    let result = spy.args[0][0];
    assert.equal(spy.calledOnce, true, 'Should call spy once');
    assert.deepEqual(result[0].queue, 4);
    assert(moment.isMoment(result[0].time), 'result time prop should be a moment')
    assert(moment('2015-01-01').isSame(result[0].time), 'should be the correct day');
  });
});
