'use strict';
import {buildUrl, mapCamerasToResults} from './helper';
export default R.curry((http, startDate, endDate, cameralist) => {
  const fetch = ([startDate, endDate, cameras]) => {
    console.log('FETCH', startDate, endDate, cameras);
    return http.get(buildUrl({startDate, endDate, cameras}))
      .map(mapCamerasToResults(cameras));
  };
  const counters = cameralist
    .map(R.filter(x => x.hasOwnProperty('counter')))
    .filter(x => x.length > 0);

  const observable = Bacon.combineAsArray(startDate, endDate, counters)
    .map(logger.log('CHIRN'))
    .filter(R.all(x => x))
    .flatMap(fetch)
    .doError(logger.error('ChurnrateContainer Error:'))
    .toProperty();

  return { observable };

});
