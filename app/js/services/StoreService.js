angular.module('app')
    .service('Store', function($http) {
        'use strict';
        this.selected = {
            id : '52fd38afe0461b48a7f9c297'
        };
        this.getCameras = function() {
            var query = {
                store : this.selected.id
            };
            return $http.post('/camera/find', query)
                .then(function (response) {
                    return response.data;
                });
        };
    });