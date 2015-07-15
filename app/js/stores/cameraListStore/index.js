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

store.error.subscribe(x => console.log('cam list error', x))

storeStore
  .tap(x => console.log('store updated', x))
  .filter(store => store && store._id)
  .tap(x => console.log('cameralist', x))
  .flatMap(fetchData)
  .subscribe(store);

function fetchData (x) {
  return helper.fetchCameraList(x._id)
    .catch(function (err) {
      store.error.onNext(err);
      return rx.Observable.empty();
    });
}
