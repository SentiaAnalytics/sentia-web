'use strict';
import storeStore from '../storeStore';
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
  (x) => x,
  (err) => console.error('posStore', err, err.stack));


rx.Observable.combineLatest(
  startDateStore.store,
  endDateStore.store,
  storeStore.store,
  (startDate, endDate, store) => {
    return {
      startDate,
      endDate,
      store
    };
  })
  .filter(helper.filterInput)
  .flatMap(helper.fetchData)
  .map(helper.processResult)
  .subscribe(store);
