'use strict';
import containerFactory from '../../services/containerFactory';
export default (date, camera, helper) => {
  const container = containerFactory.create([]);

  container.observable
    .subscribe(
      (x) => x,
      (err) => console.error('peopleStore', err, err.stack));

  Rx.Observable.combineLatest(
    date,
    camera,
    (date, camera) =>  {
      return { date, camera };
    })
    .filter(helper.filterInput)
    .flatMap(fetchData)
    .map(helper.processResult)
    .subscribe(container.observable);

  container.error.subscribe(logger.log('CameraPeopleContainer Error:'));

  function fetchData (query) {
    return helper.fetchData(query)
      .catch(function (err) {
        container.error.onNext(err);
        return Rx.Observable.empty();
      });
  }
  return container;
};
