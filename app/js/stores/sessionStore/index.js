'use strict';
import api from './api';

let store = new rx.BehaviorSubject(null);
let error = new rx.BehaviorSubject(null);
let update = new rx.Subject();


export default {
  store,
  update,
  error,
};
store.subscribe(() => error.onNext(null), (error) => console.error('sessionStore', error));
store.subscribe(x => console.log('session',x));
error.subscribe(x => console.log('sesison eeror', x));
update
  .filter((request) => {
    console.log('UPDATE', request);
    return api.hasOwnProperty(request.action);
  })
  .flatMap(request => {
    return api[request.action](request.payload)
      .catch(function (err) {
        error.onNext(err);
        return rx.Observable.empty();
      });
  })
  .subscribe(store);

// update.onNext({action: 'fetch'}) // try and load the session
