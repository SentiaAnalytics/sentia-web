'use strict';
import {buildUrl} from './helper';
export default R.curry((http, startDate, endDate, camera) => {
  const format = R.curry((format, date) => date.format(format));

  const observable = Bacon.combineAsArray(
    startDate.map(format('YYYY-MM-DD')),
    endDate.map(format('YYYY-MM-DD')),
    camera.filter(x => x).map(R.prop('_id'))
  )
    .map(([from, to, camera]) => ({from, to, camera}))
    .map(buildUrl)
    .flatMap(http.get)
    .map(logger.log('HEAT'))
    .doError(logger.error('HeatContainer Error:'))
    .toProperty();

  return {
    observable
  };
});
