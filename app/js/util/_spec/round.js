'use strict';
import '../../globals';
import {expect} from 'chai';
import sinon from 'sinon';
import round from '../round';

describe('util/round', function () {
  it('should return an integer rounded to the specied decimal', function () {
    expect(round(2, 2.222222)).to.equal(2.22);
    expect(round(3, 3.333333)).to.equal(3.333);
    expect(round(4, 4.444444)).to.equal(4.4444);
  });

  it('should be curried', function () {
    let round2 = round(2);
    expect(round(2, 2.22222)).to.equal(round2(2.2222222));
  });
});
