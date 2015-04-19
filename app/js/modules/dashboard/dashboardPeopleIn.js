'use strict';
var moment = require('moment');
var P = require('bluebird');
module.exports = function() {
  return {
    template: '{{people | waiting | dkNumber : 2}}',
    restrict: 'EA',
    controller: controller,
    scope: {
      options: '='
    }
  };
};
controller.$inject = ['$scope','PeopleService'];
function controller ($scope, peopleService) {
  $scope.people = 70;
  $scope.$watch('options', update);


  function update (options) {
    if (!options) {
      return;
    }
    P.resolve(options)
      .then(transformOptions)
      .then(buildQuery)
      .then(peopleService.get)
      .then(setPeopleIn);
  }

  function transformOptions (options) {
    return {
      cameras : filterEntranceCameras(options.store.cameras),
        startDate: options.startDate,
        endDate: options.endDate
    };
  }

  function filterEntranceCameras (cameras) {
    return cameras
      .filter(function (camera) {
        return camera.counter === 'entrance';
      })
      .map(function (e) {
          return e._id;
      });
  }
  function buildQuery (options) {
    return {
      fields : {
        'sum(people_in)' : 'people'
      },
      where : {
        cam : options.cameras,
        time : {
          gte : moment(options.startDate)
            .format('YYYY-MM-DD HH:mm:ss'),
          lt : moment(options.endDate)
            .endOf('day')
            .format('YYYY-MM-DD HH:mm:ss')
        },
        'hour(time)' : {
          gte : 9,
          lte : 20
        }
      }
    };
  }
  function setPeopleIn (data) {
    $scope.people = Number(data[0].people);
  }
}
