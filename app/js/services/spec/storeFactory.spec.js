'use strict';
import '../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import storeFactory from '../storeFactory';
import dispatcher from '../dispatcher';

describe('StoreFactory', function () {

    describe('onChange', function () {
      var store, listener;
      beforeEach(function () {
        store = storeFactory();
      });
      afterEach(function () {
        store.removeListener(listener);
      });

      it('should register an event listener when calling onChange', function () {
        listener = sinon.spy();

        store.onChange(listener);
        store.emitChange();

        expect(listener.calledOnce).to.equal(true);
        expect(listener.args[0][0]).to.equal(undefined);
      });

      it('should call the registered listener every time an event is fired', function () {
        listener = sinon.spy();

        store.onChange(listener);
        store.emitChange();
        store.emitChange();
        store.emitChange();

        expect(listener.calledThrice).to.equal(true);
      });

      it('should not call a listener after it has been removed', function () {
        var listener = sinon.spy();

        store.onChange(listener);
        store.removeListener(listener);
        store.emitChange();

        expect(listener.called).to.equal(false);
      });

    });
    describe('waitFor', function () {
      var store1, store2, token1, token2, handler1, handler2;
      afterEach(function () {
        dispatcher.unregister(token1);
        dispatcher.unregister(token2);
      });

      it('should call handlers in order, and waitFor specified handlers', function () {
        store1 = storeFactory();
        token1 = store1.register(function (action) {
           expect(handler2.calledOnce).to.equal(false);
           dispatcher.waitFor([token2]);
           expect(handler2.calledOnce).to.equal(true);
        });

        handler2 = sinon.spy();
        store2 = storeFactory();
        token2 = store2.register(handler2);
        dispatcher.dispatch({});
      });

    });

});
