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

        function CustomersEditCtrl(CustomersResource, customer) {
            this.resource = CustomersResource;
            this.customer = customer;
        }

        CustomersEditCtrl.prototype.save = function() {
            var save = null;

            if (this.customer.customer_id !== undefined) {
                save = this.resource.update(this.customer.customer_id, this.customer);
            } else {
                save = this.resource.create(this.customer);
            }

            save.then(
                function success(response) {
                    console.log(response);
                },
                function error(response) {
                    console.log(response);
                }
            );
        };

        module.controller('CustomersEditCtrl', [
            'CustomersResource',
            'customer',
            CustomersEditCtrl
        ]);

        return module;
    });
})();
