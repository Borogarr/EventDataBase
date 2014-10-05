(function() {
    'use strict';

    var moduleName = 'customers',

        angularDependencies = [
            'ui.router',
            'customers.edit'
        ];

    define([
        'require',
        'angular',
        'lodash',
        './models/customer',
        'ui.router',
        './edit/edit'
    ], function(require, angular, _, Customer) {

        var module = angular.module(moduleName, angularDependencies);

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider.state('app.customers', {
                    controller: 'CustomersCtrl',
                    controllerAs: 'Customers',
                    url: '/customers',
                    templateUrl: require.toUrl('./_customers.html'),
                    resolve: {
                        customers: ['$http', function($http) {
                            return $http.get(require.toUrl('./customers.json')).then(function(response) {
                                return _.map(response.data, function(customer) {
                                    return new Customer(customer);
                                });
                            });
                        }]
                    }
                });
            }
        ]);

        module.controller('CustomersCtrl', ['customers',
            function(customers) {
                this.customers = customers || [];
            }
        ]);

        return module;
    });
})();
