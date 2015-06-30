'use strict';
import '../../../globals';
import {expect} from 'chai';
import * as http from '../../../services/http';
import sinon from 'sinon';
import dispatcher from '../../../services/dispatcher';
import * as storesAPI from '../api';

describe('StoresStore', function () {
  let handler = sinon.spy();

  before(function () {
    dispatcher.register(handler);
  });

  after(function () {
    dispatcher.unregister(handler);
  });

  describe('fetchStore', function () {
    before(function () {
      sinon.stub(http, 'get', function (url) {
        return Promise.resolve({
          id: 1,
          name: 'Tiger 30'
        });
      });
    });

    after(function () {
      http.get.restore();
    });

    it('should dispatch a STORE_CHANGED event when a new store has been fetched', function () {
      return storesAPI.fetchStore()
        .then(function () {
          expect(handler.calledOnce).to.equal(true);
          let action = handler
            .firstCall
            .args[0];

          expect(action).to.have.property('actionType', 'STORE_CHANGED');
          expect(action).to.have.property('store');
          expect(action.store).to.eql({id: 1, name: 'Tiger 30'});
        });
    });
  });
});
