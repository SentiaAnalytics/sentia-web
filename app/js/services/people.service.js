var moment = require('moment');
module.exports = function ($http, $q) {
  'use strict';
  var people = this;
  
  people.get = function (query) {
    return $http.get('/api/people?json=' +JSON.stringify(query))
      .then(function(response) {
        return response.data || undefined;
      })
      .catch (function(error) {
        console.log(error);
        return $q.reject(error);
      });
  };

  people.getHourBreakdown = function (camera, date) {
    var query = {
      fields : {
        'hour(time)' : 'x',
        'people_in' : 'y'
      },
      where : {
        cam : camera,
        time : {
          gte : moment(date)
            .format('YYYY-MM-DD HH:mm:ss'),
          lt : moment(date)
            .add(1, 'day')
            .format('YYYY-MM-DD HH:mm:ss')
        },
        'hour(time)' : {
          gte : 9,
          lte : 23
        }

      },
      groupBy : ['x'] 
    };
    return people.get(query);
  };
};
