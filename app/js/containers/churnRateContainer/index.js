'use strict';
import containerFactory from '../../services/containerFactory';
import cameraListContainer from '../cameraListContainer';
import startDateContainer from '../startDateContainer';
import endDateContainer from '../endDateContainer';
import helper from './helper';

let container = containerFactory.create([]);
setup();
export default container;

function setup () {
  let counters = cameraListContainer
    .observable
    .map(R.filter(x => x.counter))
    .filter(R.pipe(R.isEmpty, R.not));

   rx.Observable.combineLatest(
     startDateContainer.observable,
     endDateContainer.observable,
     counters,
     (startDate, endDate, cameras) =>  {
       return { startDate, endDate, cameras};
     })
    .map(helper.buildJsonQuery)
    .flatMap(fetchData)
    .subscribe(container.observable);
}

function fetchData (query) {
  return helper.fetchData(query)
    .catch(function (err) {
      container.error.onNext(err);
      return rx.Observable.empty();
    });
}
