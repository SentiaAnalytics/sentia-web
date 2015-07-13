'use strict';
import storeFactory from '../../services/storeFactory';
import helper from './helper';

let store = storeFactory.create([]);
setup();
export default store;

function setup () {
   store.set
    .map(R.filter(x => x.counter))
    .filter(R.isEmpty)
    .map(helper.buildQuery)
    .flatMap(fetchData)
    .subscribe(store);
}

function fetchData (query) {
  return helper.fetchData(query)
    .catch(function (err) {
      store.error.onNext(err);
      return rx.Observable.empty();
    });
}
