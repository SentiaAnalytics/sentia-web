'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import startDateStore from '../';

describe('startDateStore', function () {
  it('should expose (update, store)', function () {
     expect(startDateStore).to.have.all.keys(['update','store']);
  });

  it('should ignore invalid updates', function () {
    let before = startDateStore.store.getValue();
    startDateStore.update.onNext(null);

    expect(startDateStore.store.getValue()).to.eql(before);
  });

  it('should update the store when a valid update is pushed', function () {
    startDateStore.update.onNext(moment(999999999));
    let startDate = startDateStore.store.getValue();
    expect(startDate.unix()).to.equal(moment(999999999).startOf('day').unix());
  });
});
