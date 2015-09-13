'use strict';
import {buildQuery} from './helper';
import {memoize, catchErrors} from '../../util';
export default R.curry((http, startDate, endDate, camera) => {

  const fetchData = R.compose(memoize, catchErrors(error))(http.get);
  const error = new Rx.Subject();
  const observable = Rx.Observable.combineLatest(
    startDate.map(format('YY-MM-DD')),
    endDate.map(format('YY-MM-DD')),
    camera.filter(x => x).map(R.prop('_id')),
    (from, to, camera) => ({ from, to, camera }))
    .map(buildQuery)
    .flatMap(fetchData)


  return {
    error,
    observable
  };
});
