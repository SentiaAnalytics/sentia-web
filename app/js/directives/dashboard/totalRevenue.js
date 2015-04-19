'use strict';
module.exports = function() {
  return {
    template: '<h1>{{revenue}}</h1>',
    restrict: 'E',
    controller: controller,
    scope: {
    },
  };
};
function controller ($scope) {
  $scope.revenue = 100;

}
