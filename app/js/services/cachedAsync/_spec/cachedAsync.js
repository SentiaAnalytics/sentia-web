'use strict';
import '../../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import cachedAsync from '../';

describe('cachedAsync', function () {
  it('should cache the last result', function () {
    let asyncSpy = sinon.spy(x => {
      return Rx.Observable.of('value: ' +  x);
    });
    let outputSpy = sinon.spy();

    let input = new Rx.Subject();
    let output = input
      .flatMap(cachedAsync(input, asyncSpy))
      .tap(outputSpy);

    output.subscribe(x => x)
    output.subscribe(x => x);

    input.onNext(1);

    expect(asyncSpy.calledOnce).to.equal(true);
    expect(outputSpy.calledTwice).to.equal(true);
    expect(outputSpy.args[0][0]).to.equal('value: 1');
    expect(outputSpy.args[1][0]).to.equal('value: 1');

  });

  it('should clear the cache when new input arrives', function () {
    let asyncSpy = sinon.spy(x => {
      return Rx.Observable.of('value: ' +  x);
    });
    let outputSpy = sinon.spy();

    let input = new Rx.Subject();
    let output = input
      .flatMap(cachedAsync(input, asyncSpy))
      .tap(outputSpy);

    output.subscribe(x => x);

    input.onNext(1);
    input.onNext(2);

    expect(asyncSpy.calledTwice).to.equal(true);
    expect(outputSpy.calledTwice).to.equal(true);
    expect(outputSpy.args[0][0]).to.equal('value: 1');
    expect(outputSpy.args[1][0]).to.equal('value: 2');

  });
});
