var moment = require('moment');
module.exports = function($http) {
  'use strict';
  this.selected = {
    id: '54318d4064acfb0b3139807e'
  };
  this.read = function (id) {
    return $http.get('/api/stores/' + id)
      .then(function (res) {
        return res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};
