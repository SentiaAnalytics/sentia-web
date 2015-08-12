'use strict';
import http from '../../services/http';

export default {
  fetchCamera
};

function fetchCamera (id) {
  return http.get(`/api/cameras/${id}`);
}
