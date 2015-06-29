'use strict';
import {expect} from 'chai';
import '../../../globals';
import sinon from 'sinon';
import dispatcher from '../../../services/dispatcher';
import * as storesStore from '../index';

describe('dateStore', function () {
  after(function () {
    dispatcher.unregister(storesStore.dispatchToken);
  });
  describe('when dispatching a STORE_CHANGED action', function () {
      it('should update the store', function () {
        let listener = sinon.spy();
        let action = {
          actionType: 'STORE_CHANGED',
          store: {
            id : 1,
            name: 'store'
          }
        };
        storesStore.onChange(listener);
        dispatcher.dispatch(action);
        expect(listener.calledOnce).to.equal(true);
        expect(storesStore.getSelectedStore()).to.eql(action.store);
      });
  });

});
