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

        module.factory('CustomersResource', ['Resource',
            function(Resource) {
                return new Resource('customers', Customer);
            }
        ]);

        return module;
    });
})();

