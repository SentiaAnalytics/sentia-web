'use strict';
import '../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import memoize from '../memoize';


describe('util/memoize', function () {
  it('should return the result of the function if no data is cahced',() => {
    let spy = sinon.spy(x => x);
    let memoized = memoize(spy);
    expect(memoized('test')).to.equal('test');
    expect(spy.calledOnce).to.equal(true);
    expect(spy.args[0][0]).to.equal('test');
  });

  it('should return cached value if available', function () {
    let spy = sinon.spy(x => x);
    let memoized = memoize(spy);
    expect(memoized('test')).to.equal('test');
    expect(memoized('test')).to.equal('test');
    expect(spy.calledOnce).to.equal(true);
    expect(spy.args[0][0]).to.equal('test');
  });
});
