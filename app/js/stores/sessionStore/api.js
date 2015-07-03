'use strict';
import http from '../../services/http';
import dispatcher from '../../services/dispatcher';

export default{
  fetch,
  login
};

function fetch() {
  return http.get('/api/session');
}

function login(credentials) {
  return http.post('/api/session/authenticate', credentials);
}
