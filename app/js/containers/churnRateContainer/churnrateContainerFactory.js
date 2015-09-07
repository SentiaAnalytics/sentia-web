'use strict';
import containerFactory from '../../services/containerFactory';

export default (startDate, endDate, cameralist, helper) => {
  const error = new Rx.Subject();
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
      .flatMap(fetchData);

  function fetchData (query) {
    return helper.fetchData(query)
      .map(helper.mapCamerasToResults(query.cameras))
      .catch(function (err) {
        error.onNext(err);
        return Rx.Observable.empty();
      });
  }

  return {
    error,
    observable
  };

};
