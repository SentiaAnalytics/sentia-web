'use strict';
import {fillDataGaps} from '../../util';
import {filterInput, buildUrl, parseNumbersAndDates} from './helper';

export default R.curry((http, startDate, endDate, store) => {
  const observable = Bacon.combineAsArray(startDate, endDate, store)
    .filter(R.all(x => x))
    .flatMap(([startDate, endDate, store]) => {
      const fillGaps = fillDataGaps(
        startDate,
        endDate,
        {revenue: 0, transactions:0}
      );
      return http.get(buildUrl({startDate, endDate, store}))
        .map(R.map(parseNumbersAndDates))
        .map(fillGaps)
    })
    .doError(logger.error('PosContainer Error:'))
    .toProperty();


  return {observable};
});
