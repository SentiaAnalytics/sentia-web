'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import endDateStore from '../';

describe('endDateStore', function () {
  it('should ignore invalid updates', function () {
    let before = endDateStore.getValue();
    endDateStore.set(null);

    expect(endDateStore.getValue()).to.eql(before);
  });

  it('should update the store when a valid update is pushed', function () {
    endDateStore.set( moment(999999999));
    let startDate = endDateStore.getValue();
    expect(startDate.unix()).to.equal(moment(999999999).endOf('day').unix());
  });
});
