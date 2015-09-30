'use strict';
import util from '../../util';
import {getEntranceCameras, buildUrl, processResult} from './helper';

export default R.curry((http, startDate, endDate, cameralist) => {
  const observable = Bacon.combineAsArray(startDate, endDate, cameralist)
    .filter(R.all(x => x))
    .map(logger.log('people query'))
    .flatMap(([startDate, endDate, cameralist]) => {
      const fillResultGaps = util.fillDataGaps(
        startDate,
        endDate,
        {people: 0}
      );
      return http.get(buildUrl({startDate, endDate, cameralist}))
        .map(processResult)
        .map(fillResultGaps);
    })
    .doError(logger.error('PeopleContainer Error:'))
    .toProperty();


  return {
    observable
  };
});
