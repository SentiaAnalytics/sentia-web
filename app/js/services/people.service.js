var moment = require('moment');
module.exports = function ($http, $q) {
  var people = this;
  
  people.get = function (query) {
    return $http.get('/api/people?query=' +JSON.stringify(query))
      .then(function(response) {
        return response.data || undefined;
      })
      .catch (function(error) {
        console.log(error);
        return $q.reject(error);
      });
  };

  people.getHourBreakdown = function (options) {
    var query = {
      fields : {
        'hour(time)' : 'x',
        'people_in' : 'y'
      },
      where : {
        cam : options.cam,
        time : {
          gte : moment(options.date)
            .format('YYYY-MM-DD HH:mm:ss'),
          lt : moment(options.date)
            .add(1, 'day')
            .format('YYYY-MM-DD HH:mm:ss')
        },
        'hour(time)' : {
          gte : 9,
          lte : 23
        }

      },
      groupBy : {
        x : true
      }
    };
    return people.get(query)
  }
}
