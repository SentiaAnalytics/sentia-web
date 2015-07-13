'use strict';
import helper from './helper';
import storeStore from '../storeStore';
import storeFactory from '../../services/storeFactory';
let store = storeFactory.create([]);

export default store;

store.subscribe(
  x => x,
  error => console.error('cameraList', error)
);

storeStore
  .flatMap(fetchData)
  .subscribe(store);

function fetchData (e) {
  if (!e || !e._id) return rx.Observable.of([]);
  return helper.fetchCameraList(store._id)
    .catch(function (err) {
      store.error.onNext(err);
      return rx.Observable.empty();
    });
}
