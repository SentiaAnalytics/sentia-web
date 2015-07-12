'use strict';
import cameraListStore from '../cameraListStore';
import startDateStore from '../startDateStore';
import endDateStore from '../endDateStore';
import helper from './helper';

let store = new rx.BehaviorSubject([]);
let error = new rx.BehaviorSubject(null);


export default {
  store,
  error,
};

store.subscribe(
  (x) => console.log('peopleStore', x),
  (err) => console.error('peopleStore', err, err.stack));


rx.Observable.combineLatest(
  startDateStore.store,
  endDateStore.store,
  cameraListStore.store,
  (startDate, endDate, cameras) =>  {
    return { startDate, endDate, cameras };
  })
  .filter(helper.filterInput)
  .map(helper.getEntranceCameras)
  .flatMap(fetchData)
  .map(helper.processResult)
  .subscribe(store);

function fetchData (query) {
  return helper.fetchData(query)
    .catch(function (err) {
      error.onNext(err);
      return rx.Observable.empty();
    });
}
