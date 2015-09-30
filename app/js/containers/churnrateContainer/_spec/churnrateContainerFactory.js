'use strict';
import '../../../globals';
import assert from 'assert';
import sinon from 'sinon';
import helper from '../helper';
import churnrateContainerFactory from '../churnrateContainerFactory';
import http from '../../../services/http';
import jsonResponse from './data/response.json';
const cameralist = new Bacon.Bus();
const startDate = new Bacon.Bus();
const endDate = new Bacon.Bus();
let shouldHttpFail = false;

const httpMock = {
  get: sinon.spy(url => shouldHttpFail? Bacon.once(new Bacon.Error('HTTP Error')): Bacon.once(jsonResponse))
}

const createContainer = R.partial(churnrateContainerFactory, httpMock, startDate, endDate, cameralist);

describe('churnrateContainerFactory', function () {
  beforeEach(function () {
    httpMock.get.reset();
    cameralist.push([]);
    startDate.push(moment('2015-01-01'));
    endDate.push(moment('2015-01-01'));
  });

  it('should get people in for all cameras with a counter', function () {
    const churnrateContainer = createContainer();
    let spy = sinon.spy();
    let camList = [
      {
        _id: '1',
        name: 'Camera 1',
        counter: true
      },
      {
        _id: '2',
        name: 'Camera 2',
      },
      {
        _id: '3',
        name: 'Camera 3',
        counter: true
      }
    ];

    let expectedResult = [
      {
        _id: '1',
        name: 'Camera 1',
        counter: true,
          people: 34
      },
      {
        _id: '3',
        name: 'Camera 3',
        counter: true,
        people: 123
      }
    ];
    churnrateContainer.observable.onValue(spy);
    cameralist.push(camList);
    startDate.push(moment('2015-01-01'));
    endDate.push(moment('2015-01-01'));
    assert.equal(spy.calledOnce, true, 'should call spy once ' + spy.callCount);
    assert.deepEqual(spy.args[0][0], expectedResult);
  });

});
