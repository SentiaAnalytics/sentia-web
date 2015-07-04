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

update
  .filter(id => typeof id === 'string')
  .flatMap(fetchStore)
  .subscribe(store);

update.onNext("54318d4064acfb0b3139807e"); // for now just load the store
