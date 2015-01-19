var moment = require('moment'),
  lodash = require('lodash');
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

  people.getLineChart = function (camera, date) {
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
          lte : 21
        }
      },
      groupBy : ['x'],
      orderBy : {
        'x': true
      }
    };
    return people.get(query)
      .then(function (data) {
        if (!data || data.length === 0) {
          return;
        }
        var range = lodash.range(9, 22),
        temp = data.reduce(function (arr, e) {
          arr[e.x] = e.y;
          return arr;
        }, []),
          dataSet = [];

          range.forEach(function (e) {
            dataSet.push(temp[e] || 0);
          });

          return {
            labels : range,
            series : [dataSet]
          };
      });
  };
  people.getBarchart = function (date) {
    var query = {
      fields : {
        'sum(people_in)' : 'people',
        'cam' : 'cam'
      },
      where : {
        'time' : {
          gt : moment(date)
            .format('YYYY-MM-DD'),
          lte : moment(date)
            .add(1, 'day')
            .format('YYYY-MM-DD')
        },
        'hour(time)' : {
          gte : 9,
          lte : 23
        }
      },
      groupBy : ['cam']
    };
    return people.get(query)
      .then(function(data) {
        if(data.length === 0) {
          return;
        }
        var labels = [],
          dataSet = [];
        data.sort(function (a, b) {
          return b.people - a.people;
        });
        data.forEach(function (e) {
          labels.push(e.cam);
          dataSet.push(e.people);
        });
        return {
          labels : labels,
          series : [dataSet]
        };
      });
  };
};
