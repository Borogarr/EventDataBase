(function() {
    'use strict';

    var moduleName = 'events',

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

        module.config(['$stateProvider',
            function($stateProvider) {

                $stateProvider.state('app.events', {
                    controller: 'EventsCtrl',
                    controllerAs: 'Events',
                    url: '/events',
                    templateUrl: require.toUrl('./_events.html')
                });
            }
        ]);

        module.controller('EventsCtrl', [
            function() {

            }
        ]);

        return module;
    });
})();

