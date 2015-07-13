'use strict';
import http from '../../services/http';

export default {
  fetchData
};

function fetchData (jsonQuery) {
  return http.get(`/api/people?json=${jsonQuery}`);
}
