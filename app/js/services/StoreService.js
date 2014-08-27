module.exports = function($http) {
  'use strict';
  this.selected = {
    id: '52fd38afe0461b48a7f9c297'
  };
  this.getCameras = function() {
    return $http.get('/api/stores/' + this.selected.id + '/cameras')
      .then(function(response) {
        return response.data;
      });
  };
};
