'use strict';
import http from '../../services/http';

export default {
  fetchStore
};

function fetchStore (id) {
  return http.get(`api/stores/${id}`);
}
