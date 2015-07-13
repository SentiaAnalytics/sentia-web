'use strict';
import storeFactory from '../../services/storeFactory';
import {fetchStore} from './api';

let store = storeFactory.create();


export default store;

setup();

function setup () {
  setupUpdate();
  setupLogging();
}


function setupUpdate () {
  store.set
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
      store.error.onNext(err);
      return rx.Observable.empty();
    });
}
