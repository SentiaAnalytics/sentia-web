'use strict';
import http from '../../services/http';

export default {
  fetchCameraList
};

function fetchCameraList (storeId) {
  return http.get('/api/cameras?store=' + storeId);
}
