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

  this.getMap = function(query) {
    var json = {
      camera : query.camera,
      from : moment(query.startDate)
        .format('YYYY-MM-DD'),
      to : moment(query.endDate)
        .format('YYYY-MM-DD')
    };
    return $http.get('/api/maps?camera=' +json.camera+ '&from=' + json.from + '&to=' + json.to)
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
