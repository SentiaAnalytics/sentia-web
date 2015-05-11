'use strict';
import * as http from './http';
import dispatcher from './dispatcher';

export function fetchSession() {
  return http.get('/api/session')
    .then(dispatchChangeAction);
}

export function login(credentials) {
  http.post('/api/session/authenticate', credentials)
    .then(dispatchChangeAction);
}

function dispatchChangeAction(session) {
  dispatcher.dispatch({
    actionType: 'SESSION_CHANGED',
    session: session
  });
}
