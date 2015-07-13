'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import startDateStore from '../';

describe('startDateStore', function () {
  it('should ignore invalid updates', function () {
    let before = startDateStore.getValue();
    startDateStore.set(null);

    expect(startDateStore.getValue()).to.eql(before);
  });

  it('should update the store when a valid update is pushed', function () {
    startDateStore.set(moment(999999999));
    let startDate = startDateStore.getValue();
    expect(startDate.unix()).to.equal(moment(999999999).startOf('day').unix());
  });
});
