module.exports = function ($http, $q) {
  'use strict';
  var _ = require('lodash');
  var moment = _.partialRight(require('moment-timezone').tz, 'Europe/Copenhagen');
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
  people.getTotalPeopleIn = function (query) {
    var json = {
      fields : {
        'sum(people_in)' : 'peopleIn'
      },
      where : {
        cam : query.cameras,
        time : {
          gte : query.startDate
            .clone()
            .startOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss'),
          lte : query.endDate
            .clone()
            .endOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss')
        },
      }
    };
    return people.get(json)
      .then(function (data) {
        return Number(data[0].peopleIn) || 0;
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
        'date(time)' : {
          gte : query.startDate
            .clone()
            .startOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss'),
          lt : query.endDate
            .clone()
            .endOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss')
        },
        'hour(time)' : {
          gte : 8,
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
        return _.map(data, function (e) {
          return _.defaults({date: moment(e.date)}, e);
        });
      })
      .then(function (data) {
        if (data.length === 0) {
          return {};
        }
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
          gte : query.startDate
            .clone()
            .startOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss'),
          lt : query.endDate
            .clone()
            .endOf('day')
            .tz('UTC')
            .format('YYYY-MM-DD HH:mm:ss'),
        },
        'hour(time)' : {
          gte : 9,
          lte : 20
        }
      },
      groupBy : ['cam']
    };
    return people.get(json)
      .then(function (data) {
        return _.map(data, function (e) {
          return _.defaults({date: moment(e.date)}, e);
        });
      })
      .then(function(data) {
        if (data.length === 0) {
          return $q.reject();
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
