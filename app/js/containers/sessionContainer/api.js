'use strict';
import http from '../../services/http';

export default{
  fetch,
  login,
  logout
};

function fetch() {
  return http.get('/api/session');
}

function login(credentials) {
  return http.post('/api/session/authenticate', credentials);
}

function logout () {
  return http.del('/api/session').map(x => {
    return {};
  });
}
