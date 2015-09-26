'use strict';
import {memoize, catchErrors} from '../../util';
export default R.curry((http, startDate, endDate, store) => {
  const error = new Rx.Subject();
  const fetchData = R.compose(memoize, catchErrors(error))(http.get);

  const observable = Rx.Observable.combineLatest(
    startDate.filter(x => x).map(x => x.format('YYYY-MM-DD')),
    endDate.filter(x => x).map(x => x.format('YYYY-MM-DD')),
    store.filter(x=>x).map(x => x._id),
    (startDate, endDate, storeId) => ({startDate, endDate, storeId})
  )
  .map(({startDate, endDate, storeId})=> `/api/stores/${storeId}/queues?from=${startDate}&to=${endDate}`)
  .flatMap(fetchData)
  .map(R.map(R.evolve({time: moment})))

  return {
    error,
    observable
  };

});
