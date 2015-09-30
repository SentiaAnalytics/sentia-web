'use strict';
import '../../../globals';
import assert from 'assert';
import http from '../../../services/http';
import sinon from 'sinon';
import helper from '../helper';
import peopleContainerFactory from '../peopleContainerFactory';
import response from './data/response.json';
import expected from './data/expected.json';

let shouldHttpFail = false;
let dispose;
const format = date => date.format('YYYY-MM-DD');
const startDate = Bacon.Bus();
const endDate = Bacon.Bus();
const cameralist = Bacon.Bus();
const httpMock = {
  get: sinon.spy(url => shouldHttpFail? Bacon.once(new Bacon.Error('HTTP ERROR')): Bacon.once(response))
};
const createContainer = R.partial(peopleContainerFactory, httpMock, startDate, endDate, cameralist);
describe('peopleContainer', function () {
  let disposable;
  beforeEach(() => {
    httpMock.get.reset();
  });

  afterEach(() => dispose && dispose());

  it('should not update the store until all dependencies are met', () => {
    const spy = sinon.spy();
    const peopleContainer = createContainer();
    startDate.push(null);
    dispose = peopleContainer.observable.onValue(spy);
    cameralist.push([{_id:1}]);
    assert.equal(spy.called, false, 'should not call spy');
  });

  it('should update the store whe dependencies are updated', function () {
    const spy = sinon.spy();
    const peopleContainer = createContainer();
    dispose = peopleContainer.observable.onValue(spy);
    startDate.push(moment('2015-01-01'));
    endDate.push(moment('2015-01-06'));
    cameralist.push([{_id:1}]);
    assert.equal(httpMock.get.calledOnce, true, 'should call http.get once');
    assert.equal(httpMock.get.args[0][0], `/api/people?json=%7B%22fields%22%3A%7B%22DATE_FORMAT(time%2C%20'%25Y-%25m-%25d')%22%3A%22time%22%2C%22sum(people_in)%22%3A%22people%22%7D%2C%22where%22%3A%7B%22cam%22%3A%5B1%5D%2C%22date(time)%22%3A%7B%22gte%22%3A%222015-01-01%22%2C%22lte%22%3A%222015-01-06%22%7D%2C%22hour(time)%22%3A%7B%22gte%22%3A7%2C%22lte%22%3A20%7D%7D%2C%22groupBy%22%3A%22DATE_FORMAT(time%2C%20'%25Y-%25m-%25d')%22%2C%22orderBy%22%3A%7B%22time%22%3Atrue%7D%7D`);

    assert.equal(spy.calledOnce, true, 'shoul call subscriber once');
    assert.deepEqual(R.map(R.over(R.lensProp('time'), format),spy.args[0][0]), expected, 'should return the right response')
  });
});

function setup () {
  sinon.stub(http, 'get', function (url) {
    if(shouldHttpFail) return Rx.Observable.throw('http error');
    return new Rx.BehaviorSubject(jsonResponse);
  });
}

function teardown () {
  http.get.restore();
}
