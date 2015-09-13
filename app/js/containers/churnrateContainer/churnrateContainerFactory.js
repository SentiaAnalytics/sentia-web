'use strict';
import containerFactory from '../../services/containerFactory';
import {memoize, catchErrors} from '../../util';

export default (startDate, endDate, cameralist, helper) => {
  console.log('create churn containers');
  const error = new Rx.Subject();
  const fetchData = R.compose(memoize, catchErrors(error))(helper.fetchData);
  const counters = cameralist
    .map(R.filter(x => x.counter))
    .filter(R.compose(R.not, R.isEmpty));

  const observable = Rx.Observable.combineLatest(
       startDate,
       endDate,
       counters,
       (startDate, endDate, cameras) =>  {
         return { startDate, endDate, cameras};
       })
      .flatMap(fetch);

  function fetch (query) {
    return fetchData(query)
      .map(helper.mapCamerasToResults(query.cameras));
  }

  return {
    error,
    observable
  };

};
