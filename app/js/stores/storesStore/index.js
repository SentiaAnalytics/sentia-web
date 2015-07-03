'use strict';
import {fetchStore} from './api';
let store = new rx.BehaviorSubject(null);

let update = new rx.Subject();
let error = new rx.Subject();

export default {
  update,
  store,
  error
}

update
  .filter(id => typeof id === 'string')
  .flatMap(fetchStore)
  .subscribe(store);
