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
  (value) => console.log('posStore', value),
  (err) => console.error('posStore', err));

update
  .filter(id => typeof id === 'string')
  .flatMap((input) => {
    return fetchStore(input)
      .catch(function (err) {
        error.onNext(err);
        return rx.Observable.empty();
      });
  })
  .subscribe(store);

update.onNext("54318d4064acfb0b3139807e"); // for now just load the store
