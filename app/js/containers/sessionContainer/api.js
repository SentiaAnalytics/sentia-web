'use strict';
import http from '../../services/http';

export default{
  fetch,
  login,
  logout
};

function fetch() {

}

function login(credentials) {
  return 
}

function logout () {
  return http.del('/api/session').map(x => {
    return {};
  });
}
