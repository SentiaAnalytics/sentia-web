'use strict';
import '../../../globals';
import assert from 'assert';
import sinon from 'sinon';
import dateContainerFactory from '../dateContainerFactory';


describe('dateContainerFactory', function () {

  it('should update if a valid moment is given', function () {
      let spy = sinon.spy();
      let dateContainer = dateContainerFactory();
      dateContainer.observable.onValue(spy);
      dateContainer.observer.push(moment('2015-02-02'));
      assert.equal(spy.calledOnce, true, 'should call the subscriber once');
      assert.equal(spy.args[0][0].format('YYYY-MM-DD'), '2015-02-02');
  });

  it('filter invalid inputs', function () {
      let spy = sinon.spy();
      let dateContainer = dateContainerFactory();
      dateContainer.observable.onValue(spy);
      dateContainer.observer.push(moment('2015-02-02'));
      dateContainer.observer.push('sdfasdf');
      assert.equal(spy.calledOnce, true, 'should call the subscriber once');
      assert.equal(spy.args[0][0].format('YYYY-MM-DD'), '2015-02-02');
  });

});
