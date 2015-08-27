'use strict';
import '../../../globals';
import {expect} from 'chai';
import http from '../../../services/http';
import sinon from 'sinon';
import storeContainer from '../';

describe('StoresStore', function () {
  before(stubHttp);

  after(() => http.get.restore());

  beforeEach(() => {
      storeContainer.observable.onNext(null);
  });


  it('should hold an initial value of null', function () {
    expect(storeContainer.observable.getValue()).to.equal(null);
  });

  it('should fetch and emit a new store if a valid request is sent to update', function () {
    storeContainer.observer('1234');

    let store = storeContainer.observable.getValue();

    expect(store).to.eql({
      id: '1234',
      name: 'store'
    });
  });

  it('should filter invalid requests', function () {
    storeContainer.observer({
      id: '4321'
    });

    expect(storeContainer.observable.getValue()).to.equal(null);
  });
});
function stubHttp () {
  sinon.stub(http, 'get', function (url) {
    return new Rx.BehaviorSubject({
      id: url.split('/').pop(),
      name: 'store'
    });
  });
}
