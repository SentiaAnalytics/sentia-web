'use strict';
import helper from './helper';
import storeContainer from '../storeContainer';
import containerFactory from '../../services/containerFactory';
let container = containerFactory.create([]);

export default container;

container.observable
  .subscribe(
    x => x,
    error => console.error('cameraList', error)
);

container.error
  .filter(x => x)
  .subscribe(x => console.log('cam list error', x));

storeContainer.observable
  .filter(container => container && container._id)
  .flatMap(fetchData)
  .subscribe(container.observable);

function fetchData (x) {
  return helper.fetchCameraList(x._id)
    .catch(function (err) {
      container.error.onNext(err);
      return rx.Observable.empty();
    });
}
