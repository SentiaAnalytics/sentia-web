var moment = require('moment');
var tokenize = require('url-builder').tokenize;
module.exports = function($http) {
  this.get = function (data) {
    var query = {
      fields : {
        'sum(amount)' : 'revenue',
        'count(distinct(salesno))' : 'transactions',
        'hour(starttime)' : 'hour'
      },
      where : {
        store : data.store,
        'date(starttime)' : {
          gt : moment(data.date)
            .hours(0)
            .minutes(0)
            .seconds(0)
            .format('YYYY-MM-DD HH:mm:ss'),
          lte : moment(data.date)
        .add(1, 'day')
        .hours(0)
        .minutes(0)
        .seconds(0)
        .format('YYYY-MM-DD HH:mm:ss')

        }
      },
      groupBy : ['hour']
    };
    return $http.get('/api/pos?json=' +JSON.stringify(query))
      .then(function(response) {
        return response.data || undefined;
      })
      .catch (function(error) {
        console.log(error);
        return error;
      });
  };
};
