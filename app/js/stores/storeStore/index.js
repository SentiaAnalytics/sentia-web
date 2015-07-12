'use strict';
import {fetchStore} from './api';

let store = new rx.BehaviorSubject();

let update = new rx.Subject();
let error = new rx.Subject();

export default {
  update,
  store,
  error
};

setup();

function setup () {
  setupUpdate();
  setupLogging();
}


function setupUpdate () {
  update
    .filter(id => typeof id === 'string')
    .flatMap(fetchData)
    .subscribe(store);
}

function setupLogging () {
  store.subscribe(
    (x) => x,
    (err) => console.error('storeStore', err));
}

function fetchData (query) {
  return fetchStore(query)
    .catch(function (err) {
      error.onNext(err);
      return rx.Observable.empty();
    });
}
