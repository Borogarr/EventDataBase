(function() {
    'use strict';

    var moduleName = 'customers.resources',

        angularDependencies = [
            'common.api'
        ];

    define([
        'require',
        'angular',
        'lodash',
        './models/customer',
        'common/api'
    ], function(require, angular, _, Customer) {

        var module = angular.module(moduleName, angularDependencies);

        module.factory('CustomersResource', ['Resource', '$q',
            function(Resource, $q) {
                var CustomersResource = new Resource('customers', Customer);

                CustomersResource.newCustomer = function() {
                    var deferred = $q.defer();

                    var customer = {
                        first_name: null,
                        last_name: null,
                        phone_number: null
                    };

                    deferred.resolve(new Customer(customer));

                    return deferred.promise;
                };

                return CustomersResource;
            }
        ]);

        return module;
    });
})();

