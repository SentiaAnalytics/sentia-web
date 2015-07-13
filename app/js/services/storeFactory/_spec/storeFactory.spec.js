'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import storeFactory from '../';

describe('storeFactory - create', function () {
    it('should return a store based on a BehaviorSubject', function () {
      let store = storeFactory.create();
      store.onNext(1);
      expect(store.getValue()).to.equal(1);
    });

    it('should return a store with an error store', function () {
      let store = storeFactory.create().error;
      store.onNext(1);
      expect(store.getValue()).to.equal(1);
    });

    it('should return a store with the supplied initial value', function () {
        let store = storeFactory.create('hello');
        expect(store.getValue()).to.equal('hello');
    });

    it('should clear the error, with the store is updated', function () {
        let store = storeFactory.create();
        store.error.onNext('Error');
        store.onNext('value');
        expect(store.error.getValue()).to.equal(null);
    });

    it('should not connect set to the store', function () {
        let store = storeFactory.create(null);
        store.set('Value');
        expect(store.getValue()).to.equal(null);
    });

});
