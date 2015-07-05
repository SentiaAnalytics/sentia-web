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


update
  .filter((request) => {
    return request && (request.action === 'login' || request.action === 'fetch');
  })
  .flatMap(request => {
    return api[request.action](request.payload)
      .catch(function (err) {
        error.onNext(err);
        return rx.Observable.empty()
      });
  })
  .filter((session) => session.user)
  .subscribe(store);

update.onNext({action: 'fetch'}) // try and load the session
