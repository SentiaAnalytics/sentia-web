'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import startDateContainer from '../';

describe('startDateContainer', function () {
  it('should ignore invalid updates', function () {
    let before = startDateContainer.observable.getValue();
    startDateContainer.observer(null);

    expect(startDateContainer.observable.getValue()).to.eql(before);
  });

  it('should update the store when a valid update is pushed', function () {
    startDateContainer.observer(moment(999999999));
    let startDate = startDateContainer.observable.getValue();
    expect(startDate.unix()).to.equal(moment(999999999).startOf('day').unix());
  });
});
