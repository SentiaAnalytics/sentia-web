'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import http from '../../../services/http';
import cameraListStore from '../';
import storeStore from '../../storeStore';
import cameraList from './data/cameraList';

let shouldHttpFail = false;

describe('cameraListStore', function () {
  before(setup);

  beforeEach(function () {
    storeStore.onNext(null);
  });

  after(teardown);

  it('should fetch a new list when the store is changed', function () {
    storeStore.onNext({
      _id: '123123',
      name: 'store'
    });
    expect(cameraListStore.getValue()).to.eql(cameraList);
  });

  it('should catch http errors', function () {
    shouldHttpFail = true;
    storeStore.onNext({
      _id: '123123',
      name: 'store'
    });
    expect(cameraListStore.getValue()).to.eql([]);
    expect(cameraListStore.error.getValue()).to.eql({status: 500, message: 'Internal Server Error'});
  });
});

function setup () {
  sinon.stub(http, 'get', function (url) { if (shouldHttpFail) return rx.Observable.throw({status: 500, message: 'Internal Server Error'});
    return rx.Observable.of(cameraList);
  });
}

function teardown () {
  http.get.restore();
}
