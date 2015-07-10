'use strict';
import {fetchStore} from './api';

let store = new rx.BehaviorSubject(null);

let update = new rx.Subject();
let error = new rx.Subject();

export default {
  update,
  store,
  error
};
store.subscribe(
  (x) => console.log('storeStore', x),
  (err) => console.error('storeStore', err));

update
  .filter(id => typeof id === 'string')
  .flatMap(fetchData)
  .subscribe(store);


function fetchData (query) {
  return fetchStore(query)
    .catch(function (err) {
      error.onNext(err);
      return rx.Observable.empty();
    });
}
