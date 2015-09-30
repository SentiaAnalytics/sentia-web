'use strict';
import '../../../globals';
import assert from 'assert';
import sinon from 'sinon';
import posContainerFactory from '../posContainerFactory';
import response from './data/response.json';
import expected from './data/expected.json';

let dispose;
const mapDatesToString = R.map(R.over(R.lensProp('time'), time => time.format('YYYY-MM-DD')));
const startDate = new Bacon.Bus();
const endDate = new Bacon.Bus();
const store = new Bacon.Bus();

const httpMock = {
  get: sinon.spy(url => Bacon.once(response))
};

const createContainer = R.partial(posContainerFactory, httpMock, startDate, endDate, store);

describe('posContainer', function () {


  beforeEach(function () {
    dispose && dispose();
    httpMock.get.reset();
  });

  it('should not update the store until all dependencies are met', function () {
    const posContainer = createContainer();
    const spy = sinon.spy();
    dispose = posContainer.observable.onValue(spy);
    assert.equal(httpMock.get.called, false, 'should not call http.get');
    assert.equal(spy.called, false, 'should not call subscriber');
  });

  it('should update the store whe dependencies are updated', function () {
    const posContainer = createContainer();
    const spy = sinon.spy();
    dispose = posContainer.observable.onValue(spy);
    startDate.push(moment('2015-01-01'));
    endDate.push(moment('2015-01-05'));
    store.push({_id: 1});
    assert.equal(httpMock.get.calledOnce, true, 'should call http.get once' + spy.callCount);
    
    assert.equal(httpMock.get.args[0][0], `/api/pos?json=%7B%22fields%22%3A%7B%22sum(revenue)%22%3A%22revenue%22%2C%22sum(transactions)%22%3A%22transactions%22%2C%22DATE_FORMAT(time%2C%20'%25Y-%25m-%25d')%22%3A%22time%22%7D%2C%22where%22%3A%7B%22store%22%3A1%2C%22date(time)%22%3A%7B%22gte%22%3A%222015-01-01%22%2C%22lte%22%3A%222015-01-05%22%7D%7D%2C%22groupBy%22%3A%22DATE_FORMAT(time%2C%20'%25Y-%25m-%25d')%22%2C%22orderBy%22%3A%7B%22time%22%3Atrue%7D%7D`, 'should call http.get with correct url');

    assert.equal(spy.calledOnce, true, 'should call subscriber once');
    assert.deepEqual(mapDatesToString(spy.args[0][0]), expected, 'should return correct data');

  });
});
