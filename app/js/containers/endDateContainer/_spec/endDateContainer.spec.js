'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import endDateContainer from '../';

describe('endDateContainer', function () {
  it('should ignore invalid updates', function () {
    let before = endDateContainer.observable.getValue();
    endDateContainer.observer(null);

    expect(endDateContainer.observable.getValue()).to.eql(before);
  });

  it('should update the store when a valid update is pushed', function () {
    endDateContainer.observer( moment(999999999));
    let startDate = endDateContainer.observable.getValue();
    expect(startDate.unix()).to.equal(moment(999999999).endOf('day').unix());
  });
});
