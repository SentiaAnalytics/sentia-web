'use strict';
var should = require('chai').should();
var sinon = require('sinon');
var path = require('path');
var DashboardController = require(path.join(process.cwd(), 'app/js/modules/store/dashboard/controller'));


describe('DashboardController', function () {
  var controller;
  beforeEach(function () {
      controller = new DashboardController();
  });
  it('should bind totals', function () {
    controller.should.have.property('totalPeopleIn');
    controller.should.have.property('totalRevenue');
    controller.should.have.property('totalTransactions');
    controller.should.have.property('totalBasketSize');
    controller.should.have.property('totalConversionRate');
  });
});
