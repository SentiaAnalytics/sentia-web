'use strict';
import http from '../../services/http';

export default {
  fetchData
};

function fetchData (id) {
  return http.get(`/api/cameras/${id}`);
}
