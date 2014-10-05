(function() {
    'use strict';

    var moduleName = 'customers.edit',

        angularDependencies = [
            'ui.router'
        ];

    define([
        'require',
        'angular',
        'lodash',
        '../models/customer',
        'ui.router'
    ], function(require, angular, _, Customer) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider.state('app.customers.edit', {
                    controller: 'CustomersEditCtrl',
                    controllerAs: 'CustomersEdit',
                    url: '/edit/:customerId',
                    templateUrl: require.toUrl('./_edit.html'),
                    resolve: {
                        customer: ['$http', '$stateParams', function($http, $stateParams) {
                            return $http.get(require.toUrl('../customers.json')).then(function(response) {
                                return new Customer(_.find(response.data, {
                                    customer_id: parseInt($stateParams.customerId)
                                }));
                            });
                        }]
                    }
                });
            }
        ]);

        module.controller('CustomersEditCtrl', ['customer',
            function(customer) {
                this.customer = customer || {};
            }
        ]);

        return module;
    });
})();
