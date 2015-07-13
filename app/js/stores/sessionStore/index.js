'use strict';
import storeFactory from '../../services/storeFactory';
import api from './api';

let store = storeFactory.create(null);


export default store;

store.subscribe(x => console.log('session',x));
store.error.subscribe(x => console.log('sesison eeror', x));

store.set
  .filter((request) => {
    console.log('UPDATE', request);
    return api.hasOwnProperty(request.action);
  })
  .flatMap(request => {
    return api[request.action](request.payload)
      .catch(function (err) {
        store.error.onNext(err);
        return rx.Observable.empty();
      });
  })
  .subscribe(store);

// update.onNext({action: 'fetch'}) // try and load the session
