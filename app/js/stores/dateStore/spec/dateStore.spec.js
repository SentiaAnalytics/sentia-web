'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import dispatcher from '../../../services/dispatcher';
import * as dateStore from '../';

describe('dateStore', function () {
  after(function () {
    dispatcher.unregister(dateStore.dispatchToken);
  });

  describe('When recieving UPDATE_DATE', function () {

    let listener = sinon.spy();
    beforeEach(function () {
      dateStore.onChange(listener);
    });

    afterEach(function () {
      dateStore.removeListener(listener);
      listener.reset();
    });

    it('should update to new dates', function () {
      let action = {
        actionType: 'UPDATE_DATE',
        startDate: moment(9999999),
        endDate: moment(7777777)
      };
      dispatcher.dispatch(action);
      let startDate = dateStore.getStartDate();
      let endDate = dateStore.getEndDate();

      expect(listener.calledOnce).to.equal(true);
      expect(startDate.isSame(action.startDate.startOf('day'))).to.equal(true);
      expect(endDate.isSame(action.endDate.endOf('day'))).to.equal(true);
    });

    it('should ignore undefined or null dates', function () {
      var action = {
        actionType: 'UPDATE_DATE',
        startDate: undefined,
        endDate: moment(7777777)
      };
      var startDate = dateStore.getStartDate();
      dispatcher.dispatch(action);
      var endDate = dateStore.getEndDate();

      expect(dateStore.getStartDate().isSame(startDate)).to.equal(true);
      expect(endDate.isSame(action.endDate.endOf('day'))).to.equal(true);
    });
  });
});
