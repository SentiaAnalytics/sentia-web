var moment = require('moment');
module.exports = function($http) {
  'use strict';
  this.find = function(store) {
    return $http.get('/api/cameras?store=' + store)
      .then(function(response) {
        return response.data;
      });
  };
  this.read = function(id) {
    return $http.get('/api/cameras/' + id)
      .then(function(response) {
        return response.data;
      });
  };
  this.getMap = function(data) {
    var query = {
      camera : data.camera,
      from : moment(data.date)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .format('YYYY-MM-DD'),
      to : moment(data.date)
        .add(1, 'day')
        .hours(0)
        .minutes(0)
        .seconds(0)
        .format('YYYY-MM-DD')
    };
    return $http.get('/api/maps?camera=' +query.camera+ '&from=' + query.from + '&to=' + query.to)
      .then(function(response) {
        return response.data || undefined;
      })
      .
    catch (function(error) {
      console.log(error);
      return error;
    });
  };
};
