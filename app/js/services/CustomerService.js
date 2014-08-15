angular.module('app')
    .service('Customers', function($http) {
        'use strict';
        this.selected = {
            id : '52fd38afe0461b48a7f9c297'
        };
        this.getCustomerData = function() {
            var query = {
                store : this.selected.id
            };
            return $http.post('/customers/find', query)
                .then(function (response) {
                    return response.data;
                });
        };
    });