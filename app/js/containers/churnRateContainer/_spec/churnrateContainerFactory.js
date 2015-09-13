'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import helper from '../helper';
import churnrateContainerFactory from '../churnrateContainerFactory';
import http from '../../../services/http';
import jsonResponse from './data/response.json';

const cameralist = new Rx.BehaviorSubject([]);
const startDate = new Rx.BehaviorSubject(moment());
const endDate = new Rx.BehaviorSubject(moment());
const churnrateContainer = churnrateContainerFactory(startDate, endDate, cameralist, helper);

describe('churnrateContainerFactory', function () {
  before(setup);
  after(teardown);

  beforeEach(function () {
    cameralist.onNext([]);
  });

  it('should not update if no cameras has counters', function () {
    let spy = sinon.spy();
    churnrateContainer.observable.subscribe(spy);
    cameralist.onNext([{_id: '1'},{_id: '2'}]);
    expect(spy.called).to.equal(false);
  });

  it('should get people in for all cameras with a counter', function () {
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
    churnrateContainer.observable.subscribe(spy);
    cameralist.onNext(camList);
    expect(spy.calledOnce).to.equal(true);
    expect(spy.args[0][0]).to.eql(expectedResult);
  });

});

function setup () {
  sinon.stub(http, 'get', function () {
    return Rx.Observable.of(jsonResponse);
  });
}

function teardown () {
  http.get.restore();
}
