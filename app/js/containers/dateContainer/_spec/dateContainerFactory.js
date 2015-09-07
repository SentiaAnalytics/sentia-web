'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import dateContainerFactory from '../dateContainerFactory';

const locationMock = {
  get: sinon.spy(() =>  '2015-01-01'),
  set: sinon.spy()
};

const createContainer = dateContainerFactory(locationMock, 'test');
const mapStartDate = sinon.spy((date) => date.startOf('day'));
const mapEndDate = sinon.spy((date) => date.endOf('day'));

describe('dateContainerFactory', function () {
  beforeEach(() => {
    locationMock.get.reset();
    locationMock.set.reset();
    mapStartDate.reset();
    mapEndDate.reset();
  });

  it('should get the initial value from location', function () {
      let spy = sinon.spy();
      let container = createContainer(x => x);
      container.observable.subscribe(spy);
      expect(spy.calledOnce).to.equal(true);
      expect(spy.args[0][0].toString()).to.equal(moment('2015-01-01', 'YYYY-MM-DD').toString());
  });
  it('should use the current date if no date is given', function () {
      let spy = sinon.spy();
      let mock = R.assoc('get', () => undefined, locationMock);
      let container = dateContainerFactory(mock, 'test', x => x);
      container.observable.subscribe(spy);
      expect(spy.calledOnce).to.equal(true);
      expect(spy.args[0][0].toString()).to.equal(moment().toString('YYYY-MM-DD'));

  });

  it('should transform the date with the mapDatefunction', function () {
      let spy = sinon.spy();
      let container = createContainer(mapStartDate);
      container.observer.onNext(moment(9999));
      container.observable.subscribe(spy);
      expect(spy.calledOnce).to.equal(true);
      expect(spy.args[0][0].toString()).to.equal(mapStartDate(moment(9999)).toString());
  });

  it('should update the location', function () {
      let spy = sinon.spy();
      let container = createContainer(x => x);
      container.observer.onNext(moment(9999));
      container.observable.subscribe(spy);
      expect(locationMock.set.calledOnce).to.equal(true);
      expect(locationMock.set.args[0][0]).to.equal('test');
      expect(locationMock.set.args[0][1]).to.equal(moment(9999).format('YYYY-MM-DD'));
  });

});
