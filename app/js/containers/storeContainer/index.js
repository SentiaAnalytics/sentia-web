'use strict';
import containerFactory from '../../services/containerFactory';
import {fetchStore} from './api';

let container = containerFactory.create();


export default container;

setup();

function setup () {
  setupUpdate();
  setupLogging();
}


function setupUpdate () {
  container.observer
    .filter(id => typeof id === 'string')
    .flatMap(fetchData)
    .subscribe(container.observable);
}

function setupLogging () {
  container.observable
  .subscribe(
    (x) => x,
    (err) => console.error('storeStore', err));
}

function fetchData (query) {
  return fetchStore(query)
    .catch(function (err) {
      container.error.onNext(err);
      return rx.Observable.empty();
    });
}
