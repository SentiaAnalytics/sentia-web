'use strict';
import storeStore from '../storeStore';
import dateStore from '../dateStore';
import helper from './helper';

let store = new rx.BehaviorSubject(null);
let error = new rx.BehaviorSubject(null);

export default {
  store,
  error
};
store.subscribe(R.identity, (err) => error.onNext(err));

error.subscribe(function (err) {
  console.log('err');
  console.log(err && err.stack);
});

store.forEach(function (value) {
    console.log('posStore updated');
    console.log(value);
});


rx.Observable.combineLatest(
    dateStore.store,
    storeStore.store,
    (dates, store) => R.merge(dates, {store:store})
  )
  .filter(helper.filterInput)
  .flatMap(helper.fetchData)
  .map(helper.processResult)
  .subscribe(store);
