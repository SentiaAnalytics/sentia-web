'use strict';
import containerFactory from '../../services/containerFactory';
import {fetchStore} from './api';

let container = containerFactory.create();


export default container;

container.error.subscribe(logger.log('StoreContainer Error:'));
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

  container.error.subscribe(x => console.log('Store error', x));
}

function fetchData (query) {
  return fetchStore(query)
    .catch(function (err) {
      console.log('ERROR ', err);
      container.error.onNext(err);
      return Rx.Observable.empty();
    });
}
