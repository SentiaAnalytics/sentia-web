'use strict';
import '../../globals';
import assert from 'assert';
import sinon from 'sinon';
import formatNumber from '../formatNumber';

describe('util/formatNumbers', function () {
  it('should insert commas for every 3 cifers', () => {
    const number = 1000;
    const expected = '1,000';
    const actual = formatNumber(number);
    assert.equal(actual, expected);
  });

  it('should respect decimal points', () => {
    const number = 1000000.23123123;
    const expected = '1,000,000.23123123';
    const actual = formatNumber(number);
    assert.equal(actual, expected);
  });
});
