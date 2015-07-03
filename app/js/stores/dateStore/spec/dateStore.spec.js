'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import dateStore from '../';

describe('dateStore', function () {
  it('should expose (update, store error)', function () {
     expect(dateStore).to.have.all.keys(['update','store', 'error']);
  });

  it('should hold today as initial valie', function () {
    let {startDate, endDate} = dateStore.store.getValue();

    expect(startDate.isSame(moment().startOf('day'))).to.equal(true);
    expect(endDate.isSame(moment().endOf('day'))).to.equal(true);
  });

  it('should ignore invalid updates', function () {
    let before = dateStore.store.getValue();
    dateStore.update.onNext({});

    expect(dateStore.store.getValue()).to.eql(before);
  });

  it('should update the store when a valid update is pushed', function () {
    dateStore.update.onNext({
      startDate: moment(999999999)
    });
    let {startDate, endDate} = dateStore.store.getValue();
    expect(startDate.isSame(moment(999999999).startOf('day'))).to.be.true;
    expect(endDate.isSame(moment().endOf('day'))).to.be.true;
  });
});
