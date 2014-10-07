var moment = require('moment');
module.exports = function($http, $q) {
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
        module.exports.selectedCam = response.data;
        return response.data;
      });
  };
  this.getMap = function(query) {
    if (!module.exports.selectedCam) {
      return $q.reject('No cam selected');
    }
    query.from = moment()
      .subtract(1, 'day')
      .hours(12)
      .minutes(0)
      .seconds(0)
      .format('YYYY-MM-DD HH:mm:ss');
    query.to = moment(query.from).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');
    console.log(query);
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
  this.getTimeline = function(query) {
    if (!this.selectedCam) {
      return $q.reject('No cam selected');
    }
    query.cam = this.selectedCam.id;
    return $http.get('/maps/timeline', query)
      .then(function(response) {
        var data = [24],
          i,
          max = 1;
        for (i = 0; i < 24; i += 1) {
          data[i] = 0;
        }
        for (i = 0; i < response.data.length; i += 1) {
          data[response.data[i].hour] = response.data[i].count || 0;
          max = Math.max(max, response.data[i].count);
        }
        return {
          max: max,
          data: data
        };
      })
      .
    catch (function(err, status) {
      console.log(status);
      console.error(err);
    });
  };
};
