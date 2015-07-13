'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import storeStore from '../';

describe('StoresStore', function () {
  before(stubHttp);

  after(() => http.get.restore());

  beforeEach(() => {
      storeStore.onNext(null);
  });


  it('should hold an initial value of null', function () {
    expect(storeStore.getValue()).to.equal(null);
  });

  it('should fetch and emit a new store if a valid request is sent to update', function () {
    storeStore.set('1234');

    let store = storeStore.getValue();

    expect(store).to.eql({
      id: '1234',
      name: 'store'
    });
  });

  it('should filter invalid requests', function () {
    storeStore.set({
      id: '4321'
    });

    expect(storeStore.getValue()).to.equal(null);
  });
});
function stubHttp () {
  sinon.stub(http, 'get', function (url) {
    return new rx.BehaviorSubject({
      id: url.split('/').pop(),
      name: 'store'
    });
  });
}
