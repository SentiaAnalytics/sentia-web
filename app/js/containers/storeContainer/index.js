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
    .tap(x => console.log('fetch store', x))
    .flatMap(fetchData)
    .tap(x => console.log('STORE', x))
    .subscribe(container.observable);

}

function setupLogging () {
  container.observable
  .subscribe(
    (x) => x,
    (err) => console.error('storeStore', err));

  container.error.subscribe(x => console.log('Store error', x));
}

function fetchData (query) {
  return fetchStore(query)
    .catch(function (err) {
      console.log('ERROR ', err);
      container.error.onNext(err);
      return rx.Observable.empty();
    });
}
