'use strict';
import containerFactory from '../../services/containerFactory';
import api from './api';

let container = containerFactory.create(null);


export default container;

container.error
  .filter(x => x)
  .subscribe(x => console.log('sesison eeror', x));

container.observer
  .filter((request) =>  api.hasOwnProperty(request.action))
  .flatMap(request => {
    return api[request.action](request.payload)
      .catch(function (err) {
        container.error.onNext(err);
        return rx.Observable.empty();
      });
  })
  .subscribe(container.observable);

// update.onNext({action: 'fetch'}) // try and load the session
