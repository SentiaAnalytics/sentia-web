'use strict';
import helper from './helper';
import storeStore from '../storeStore';
let store = new rx.BehaviorSubject(null);
let error = new rx.BehaviorSubject(null);

export default {
  store,
  error
};

storeStore
  .store
  .flatMap(fetchData)
  .subscribe(store);

function fetchData (store) {
  if (!store || !store._id) return rx.Observable.of([]);
  return helper.fetchCameraList(store._id)
    .catch(function (err) {
      error.onNext(err);
      return rx.Observable.empty();
    });
}
