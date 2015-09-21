'use strict';
import containerFactory from '../../services/containerFactory';
import api from './api';

let container = containerFactory.create(null);


export default container;

container.observer
  .filter((request) =>  api.hasOwnProperty(request.action))
  .flatMap(request => {
    return api[request.action](request.payload)
      .catch(function (err) {
        container.error.onNext(err.data);
        return Rx.Observable.empty();
      });
  })
  .tap(x => container.error.onNext(null))
  .subscribe(container.observable);

  container.error.subscribe(logger.log('SessionContainer Error:'));
  container.observable.subscribe(logger.log('SessionContainer'), x => logger.error('SessionContainer'));

// update.onNext({action: 'fetch'}) // try and load the session
