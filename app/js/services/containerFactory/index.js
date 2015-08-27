'use strict';
import eventListenerFactory from '../eventListenerFactory';

export default {
  create
};

function create (initialValue) {
  let observable = new Rx.BehaviorSubject(initialValue);
  let error = new Rx.BehaviorSubject();
  let observer = eventListenerFactory.create();

  return {
    observable,
    observer,
    error
  };
}
