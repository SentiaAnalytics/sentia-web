'use strict';
import api from './api';

let store = new rx.BehaviorSubject(null);
let errors = new rx.BehaviorSubject(null);
let update = new rx.Subject();

export default {
  store,
  update,
  errors,
};
update
  .filter((request) => {
    return request && (request.action === 'login' || request.action === 'fetch');
  })
  .flatMap(request => {
    return api[request.action](request.payload);
  })
  .filter((session) => session.user)
  .subscribe(store);
