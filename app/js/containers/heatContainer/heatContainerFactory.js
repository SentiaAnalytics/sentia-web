'use strict';
import {buildUrl} from './helper';
import {memoize, catchErrors} from '../../util';
export default R.curry((http, startDate, endDate, camera) => {
  const format = R.curry((format, date) => date.format(format));
  const error = new Rx.Subject();
  const fetchData = R.compose(memoize, catchErrors(error))(http.get);
  const observable = Rx.Observable.combineLatest(
    startDate.map(format('YYYY-MM-DD')),
    endDate.map(format('YYYY-MM-DD')),
    camera.filter(x => x).map(R.prop('_id')),
    (from, to, camera) => ({ from, to, camera }))
    .map(buildUrl)
    .flatMap(fetchData)

  error.subscribe(logger.log('HeatContainer Error:'));

  return {
    error,
    observable
  };
});
