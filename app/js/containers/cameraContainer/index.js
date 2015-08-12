'use strict';
import containerFactory from '../../services/containerFactory';
import {fetchCamera} from './api';

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
    (x) => console.log(x),
    (err) => console.error('cameraStore', err));
}

function fetchData (query) {
  return fetchCamera(query)
    .catch(function (err) {
      container.error.onNext(err);
      return rx.Observable.empty();
    });
}
