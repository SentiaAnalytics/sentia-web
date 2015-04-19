'use strict';

angular.module('dashboard', [])
  .directive('dashboardRevenue', require('./dashboardRevenue'))
  .directive('dashboardTransactions', require('./dashboardTransactions'))
  .directive('dashboardBasketSize', require('./dashboardBasketSize'))
  .directive('dashboardPeopleIn', require('./dashboardPeopleIn'));
