'use strict';
import '../../globals';
import assert from 'assert';
import sinon from 'sinon';
import fillDataGaps from '../fillDataGaps';

describe('fillDataGaps', function () {
  it('should work for hours', function () {
      const data = [
        {time: moment('2015-01-01 10:00:00'), people: 1 },
        {time: moment('2015-01-01 13:00:00'), people: 3 },
      ];

      const expected = [
        {time: '2015-01-01 09:00:00', people: 0 },
        {time: '2015-01-01 10:00:00', people: 1 },
        {time: '2015-01-01 11:00:00', people: 0 },
        {time: '2015-01-01 12:00:00', people: 0 },
        {time: '2015-01-01 13:00:00', people: 3 },
        {time: '2015-01-01 14:00:00', people: 0 },
        {time: '2015-01-01 15:00:00', people: 0 },
        {time: '2015-01-01 16:00:00', people: 0 },
        {time: '2015-01-01 17:00:00', people: 0 },
        {time: '2015-01-01 18:00:00', people: 0 },
        {time: '2015-01-01 19:00:00', people: 0 },
        {time: '2015-01-01 20:00:00', people: 0 },
        {time: '2015-01-01 21:00:00', people: 0 },
        {time: '2015-01-01 22:00:00', people: 0 },
      ];

      const defaultValue = {people: 0};
      const actual = fillDataGaps(moment('2015-01-01 10:00:00'),moment('2015-01-01 13:00:00'), defaultValue, data);
      const formatMoment = x => x.format('YYYY-MM-DD HH:00:00');
      assert.deepEqual(actual.map(R.evolve({time: formatMoment})), expected);
  });

  it('should work for days', function () {
      const data = [
        {time: moment('2015-01-01'), people: 1 },
        {time: moment('2015-01-03'), people: 3 },
        {time: moment('2015-01-04'), people: 4 }
      ];

      const expected = [
        {time: '2015-01-01', people: 1 },
        {time: '2015-01-02', people: 0 },
        {time: '2015-01-03', people: 3 },
        {time: '2015-01-04', people: 4 }
      ];

      const defaultValue = {people: 0};
      const actual = fillDataGaps(moment('2015-01-01'),moment('2015-01-04'), defaultValue, data);
      const formatMoment = x => x.format('YYYY-MM-DD');
      assert.deepEqual(actual.map(R.evolve({time: formatMoment})), expected);
  });

  it('should work for months', function () {
      const data = [
        {time: moment('2015-01-01'), people: 1 },
        {time: moment('2015-02-01'), people: 3 },
        {time: moment('2015-04-01'), people: 4 }
      ];

      const expected = [
        {time: '2015-01-01', people: 1 },
        {time: '2015-02-01', people: 3 },
        {time: '2015-03-01', people: 0 },
        {time: '2015-04-01', people: 4 }
      ];

      const defaultValue = {people: 0};
      const actual = fillDataGaps(moment('2015-01-01'),moment('2015-04-01'), defaultValue, data);
      const formatMoment = x => x.format('YYYY-MM-DD');
      assert.deepEqual(actual.map(R.evolve({time: formatMoment})), expected);
  });

  it('should work for years', function () {
      const data = [
        {time: moment('2015-01-01'), people: 1 },
        {time: moment('2016-01-01'), people: 3 },
        {time: moment('2018-01-01'), people: 4 }
      ];

      const expected = [
        {time: '2015-01-01', people: 1 },
        {time: '2016-01-01', people: 3 },
        {time: '2017-01-01', people: 0 },
        {time: '2018-01-01', people: 4 }
      ];

      const defaultValue = {people: 0};
      const actual = fillDataGaps(moment('2015-01-01'), moment('2018-04-01'), defaultValue, data);
      const formatMoment = x => x.format('YYYY-MM-DD');
      assert.deepEqual(actual.map(R.evolve({time: formatMoment})), expected);
  });
});
