(function() {
    'use strict';

    var moduleName = 'customers',

        angularDependencies = [
            'ui.router',
            'ngAnimate',
            'customers.edit'
        ];

    define([
        'require',
        'angular',
        'lodash',
        './models/customer',
        'ui.router',
        'angular-animate',
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

        function CustomersCtrl(customers) {
            this.customers = customers;
        }

        CustomersCtrl.prototype.delete = function(customer) {
            var index = this.customers.indexOf(customer);

            this.customers.splice(index, 0);
        };

        module.controller('CustomersCtrl', [
            'customers',
            CustomersCtrl
        ]);

        return module;
    });
})();
