module.exports = function($http, $q) {
  'use strict';
  var moment = require('moment');
  var selectedCamera = null; // stores the selected camera

  this.getSelectedCamera = function (id) {
    if (!id || selectedCamera && selectedCamera._id === id) {
      return $q.when(selectedCamera);
    }
    return this.read(id)
      .then(function (camera) {
        selectedCamera = camera;
        return camera;
      });
  };

  this.setSelectedCamera = function (camera) {
    selectedCamera = camera;
    return camera;
  };

  this.get = function (query) {
    return $http.get('/api/cameras?json='+ JSON.stringify(query))
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
