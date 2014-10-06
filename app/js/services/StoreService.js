module.exports = function($http) {
  'use strict';
  this.selected = {
    id: '54318d4064acfb0b3139807e'
  };
  this.getCameras = function() {
    return $http.get('/api/cameras?store=' + this.selected.id)
      .then(function(response) {
        return response.data;
      });
  };
};
