'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import storeStore from '../';

describe('StoresStore', function () {
  before(function () {
      sinon.stub(http, 'get', function (url) {
        return new rx.BehaviorSubject({
          id: url.split('/').pop(),
          name: 'store'
        });
      });
  });

  after(function () {
      http.get.restore();
  });

  beforeEach(function () {
      storeStore.store.onNext(null);
  });

  it('should hold an initial value of null', function () {
    expect(storeStore.store.getValue()).to.equal(null);
  });

  it('should fetch and emit a new store if a valid request is sent to update', function (done) {
    let spy = sinon.spy(storeUpdated);
    storeStore.store.subscribe(spy);
    storeStore.update.onNext('1234');

    function storeUpdated (store) {
      if(!store) return;
      expect(spy.calledTwice).to.be.true;
      expect(store).to.eql({
        id: '1234',
        name: 'store'
      });
      done();
    }
  });

  it('should filter invalid requests', function () {
    storeStore.update.onNext({
      id: '4321'
    });

    expect(storeStore.store.getValue()).to.equal(null);
  });
});
