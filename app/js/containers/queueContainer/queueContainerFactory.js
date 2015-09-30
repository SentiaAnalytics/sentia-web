'use strict';
import {fillDataGaps} from '../../util';
import {buildUrl} from './helper';
export default R.curry((http, startDate, endDate, store) => {
  const observable = Bacon.combineAsArray(startDate, endDate, store)
    .filter(R.all(x => x))
    .flatMap(([startDate, endDate, store]) => {
      const fillGaps = fillDataGaps(startDate, endDate, {queue:0});

      return http.get(buildUrl({startDate, endDate, store}))
        .map(R.map(R.evolve({time:moment})))
        .map(fillGaps);
    })
    .doError(logger.error('QueueContainer Error:'))
    .toProperty();

  return {
    observable
  };

});
