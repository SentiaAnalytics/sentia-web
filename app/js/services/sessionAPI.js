'use strict';
import * as http from './http';
import dispatcher from './dispatcher';

export function fetchSession() {
  return http.get('/api/session')
    .then(dispatchChangeAction)
    .catch(dispatchError('SESSION_ERROR'));
}

export function login(credentials) {
  http.post('/api/session/authenticate', credentials)
    .then(dispatchChangeAction)
    .catch(dispatchError('LOGIN_ERROR'));
}

function dispatchChangeAction(session) {
  dispatcher.dispatch({
    actionType: 'SESSION_CHANGED',
    session: session
  });
}

function dispatchLoginError (err) {
  dispatcher.dispatch({
    actionType: 'LOGIN_ERROR',
    error: err
  });
}

function dispatchError (type) {
  return function (err) {
    dispatcher.dispatch({
      actionType: type,
      error: err
    });
  }
}
