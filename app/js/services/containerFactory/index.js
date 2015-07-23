'use strict';
import eventListenerFactory from '../eventListenerFactory';

export default {
  create
};

function create (initialValue) {
  let observable = new rx.BehaviorSubject(initialValue);
  let error = new rx.BehaviorSubject();
  let observer = eventListenerFactory.create();

  return {
    observable,
    observer,
    error
  };
}
