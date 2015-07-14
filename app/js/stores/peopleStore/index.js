'use strict';
import storeFactory from '../../services/storeFactory';
import cameraListStore from '../cameraListStore';
import startDateStore from '../startDateStore';
import endDateStore from '../endDateStore';
import helper from './helper';

let store = storeFactory.create([]);

export default store;

store.subscribe(
  (x) => x,
  (err) => console.error('peopleStore', err, err.stack));


rx.Observable.combineLatest(
  startDateStore,
  endDateStore,
  cameraListStore,
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
      store.error.onNext(err);
      return rx.Observable.empty();
    });
}
