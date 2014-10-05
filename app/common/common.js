(function() {
    'use strict';

    var moduleName = 'common',

        angularDependencies = [
            'common.navigation'
        ];

    define([
        'require',
        'angular',
        'lodash',
        './navigation/navigation'
    ], function(require, angular, _) {

        var module = angular.module(moduleName, angularDependencies);

        return module;
    });
})();

