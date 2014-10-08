(function() {
    'use strict';

    var moduleName = 'customers.edit',

        angularDependencies = [
            'ui.router',
            'customers.resources'
        ];

    define([
        'require',
        'angular',
        'lodash',
        '../models/customer',
        'ui.router',
        '../resources'
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
                        customer: ['$http', '$stateParams', 'CustomersResource',
                            function($http, $stateParams, CustomersResource) {
                                var id = $stateParams.customerId;

                                if (_.isString(id) && id === 'new') {
                                    return CustomersResource.newCustomer();
                                }

                                return $http.get(require.toUrl('../customers.json')).then(function(response) {
                                    return new Customer(_.indexBy(response.data, 'customer_id')[id]);
                                });
                            }
                        ]
                    }
                });
            }
        ]);

        module.controller('CustomersEditCtrl', ['CustomersResource', 'customer',
            function(CustomersResource, customer) {
                this.customer = customer;

                this.save = function() {
                    var save = null;

                    if (this.customer.customer_id !== undefined) {
                        save = CustomersResource.update(this.customer.customer_id, this.customer);
                    } else {
                        save = CustomersResource.create(this.customer);
                    }

                    save.then(
                        function success(response) {
                            console.log(response);
                        }, function error(response) {
                            console.log(response);
                        }
                    );
                };
            }
        ]);

        return module;
    });
})();
