(function() {
    'use strict';

    var moduleName = 'common.navigation',

        angularDependencies = [
            'ui.router'
        ];

    define([
        'require',
        'angular',
        'lodash',
        'ui.router'
    ], function(require, angular, _) {

        var module = angular.module(moduleName, angularDependencies);

        module.controller('NavigationCtrl', ['$state',
            function($state) {
                this.partial = require.toUrl('./_navigation.html');
            }
        ]);

        return module;
    });
})();

