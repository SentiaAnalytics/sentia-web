'use strict';
import eventListenerFactory from '../eventListenerFactory';

export default {
  create
};

function create (initialValue) {
  let store = new rx.BehaviorSubject(initialValue);
  store.error = new rx.BehaviorSubject();
  store.set = eventListenerFactory.create();

  store.subscribe(x => store.error.onNext(null));

  return store;
}
