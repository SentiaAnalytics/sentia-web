'use strict';
import storeStore from '../storeStore';
import startDateStore from '../startDateStore';
import endDateStore from '../endDateStore';
import helper from './helper';
import storeFactory  from '../../services/storeFactory';

let store = storeFactory.create([]);


export default store;

store.subscribe(
  store => store,
  (err) => console.error('posStore', err, err.stack));


rx.Observable.combineLatest(
  startDateStore,
  endDateStore,
  storeStore,
  (startDate, endDate, store) =>  {
    return { startDate, endDate, store };
  })
  .filter(helper.filterInput)
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
