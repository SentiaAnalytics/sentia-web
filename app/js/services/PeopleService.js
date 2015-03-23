module.exports = function ($http, $q) {
  'use strict';

  var moment = require('moment'),
    _ = require('lodash');
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
  people.getTotalPeopleIn = function (args) {
    var query = {
      fields : {
        'sum(people_in)' : 'peopleIn'
      },
      where : {
        cam : args.cameras,
        time : {
          gte : moment(args.startDate)
            .format('YYYY-MM-DD HH:mm:ss'),
          lt : moment(args.endDate)
            .endOf('day')
            .format('YYYY-MM-DD HH:mm:ss')
        },
        'hour(time)' : {
          gte : 9,
          lte : 20
        }
      }
    };
    return people.get(query)
      .then(function (data) {
        return Number(data[0].peopleIn);
      });

  };

  people.getLineChart = function (query) {
    var json = {
      fields : {
        'time' : 'date',
        'sum(people_in)' : 'people'
      },
      where : {
        cam : query.cameras,
        time : {
          gte : moment(query.startDate)
            .startOf('day')
            .format('YYYY-MM-DD HH:mm:ss'),
          lte : moment(query.endDate)
            .endOf('day')
            .format('YYYY-MM-DD HH:mm:ss')
        },
        'hour(time)' : {
          gte : 9,
          lte : 20
        }
      },
      groupBy : getGroupBy(query),
      orderBy : {
        'time': true
      }
    };
    return people.get(json)
      .then(function (data) {
        return {
          labels: _.pluck(data, 'date'),
          series: [_.pluck(data, 'people')]
        };
      });
  };
  people.getChurnRateData = function (query) {
    var json = {
      fields : {
        'sum(people_in)' : 'people',
        'cam' : 'cam'
      },
      where : {
        cam: query.cameras,
        'time' : {
          gt : moment(query.startDate)
            .format('YYYY-MM-DD HH:mm:ss'),
          lte : moment(query.endDate)
            .endOf('day')
            .format('YYYY-MM-DD HH:mm:ss'),
        },
        'hour(time)' : {
          gte : 9,
          lte : 23
        }
      },
      groupBy : ['cam']
    };
    return people.get(json)
      .then(function(data) {
        if(data.length === 0) {
          return;
        }
        return data;
      });
  };
  function getGroupBy (query) {
    var start = moment(query.startDate);
    var end = moment(query.endDate);
    if (start.isSame(end, 'day')) {
      return ['hour(time)'];
    } else if (start.isSame(end, 'month')) {
      return ['date(time)'];
    }
    return ['month(time)'];
  }
};
