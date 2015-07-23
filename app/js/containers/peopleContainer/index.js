'use strict';
import containerFactory from '../../services/containerFactory';
import cameraListContainer from '../cameraListContainer';
import startDateContainer from '../startDateContainer';
import endDateContainer from '../endDateContainer';
import helper from './helper';

let container = containerFactory.create([]);

export default container;

container.observable
  .subscribe(
    (x) => x,
    (err) => console.error('peopleStore', err, err.stack));


rx.Observable.combineLatest(
  startDateContainer.observable,
  endDateContainer.observable,
  cameraListContainer.observable,
  (startDate, endDate, cameras) =>  {
    return { startDate, endDate, cameras };
  })
  .filter(helper.filterInput)
  .map(helper.getEntranceCameras)
  .flatMap(fetchData)
  .map(helper.processResult)
  .subscribe(container.observable);

function fetchData (query) {
  return helper.fetchData(query)
    .catch(function (err) {
      container.error.onNext(err);
      return rx.Observable.empty();
    });
}
