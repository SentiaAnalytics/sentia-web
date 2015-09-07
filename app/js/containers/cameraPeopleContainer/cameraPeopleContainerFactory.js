'use strict';
import containerFactory from '../../services/containerFactory';
export default (startDate, endDate, camera, helper) => {
  const container = containerFactory.create([]);

  container.observable
    .subscribe(
      (x) => x,
      (err) => console.error('peopleStore', err, err.stack));

  Rx.Observable.combineLatest(
    startDate,
    endDate,
    camera,
    (startDate, endDate, camera) =>  {
      return { startDate, endDate, camera };
    })
    .filter(helper.filterInput)
    .flatMap(fetchData)
    .map(helper.processResult)
    .subscribe(container.observable);

  function fetchData (query) {
    return helper.fetchData(query)
      .catch(function (err) {
        container.error.onNext(err);
        return Rx.Observable.empty();
      });
  }
  return container;
};
