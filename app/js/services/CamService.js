module.exports = function($http, $q) {
  'use strict';
  this.getCam = function(id) {
    return $http.get('/stores/' + id +'/camera/find')
      .then(function(response) {
        module.exports.selectedCam = response.data[0];
        return response.data[0];
      });
  };
  this.getOverlay = function(query) {
    if (!module.exports.selectedCam) {
      return $q.reject('No cam selected');
    }
    query.cam = module.exports.selectedCam.id;
    console.log(query);
    return $http.post('/map/find', query)
      .then(function(response) {
        mixpanel.track('View Map', {
          cam: query.cam,
          date: query.date,
          type: query.type
        });
        return response.data || undefined;
      })
      .
    catch (function(error) {
      console.log(status);
      console.log(error);
      mixpanel.track('View Map Error', {
        cam: query.cam,
        date: query.date
      });
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
        mixpanel.track('Update Timeline', {
          cam: data.cam,
          date: data.date
        });
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
