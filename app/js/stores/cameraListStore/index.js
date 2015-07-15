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
  .filter(store => store && store._id)
  .tap(x => console.log('cameralist', x))
  .flatMap(fetchData)
  .subscribe(store);

function fetchData (store) {
  return helper.fetchCameraList(store._id)
    .catch(function (err) {
      store.error.onNext(err);
      return rx.Observable.empty();
    });
}
