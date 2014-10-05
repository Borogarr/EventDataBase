(function() {
    'use strict';

    var moduleName = 'common.api',

        angularDependencies = [];

    define([
        'require',
        'angular'
    ], function(require, angular) {

        var module = angular.module(moduleName, angularDependencies);

        module.factory('Resource', ['$http', '$q',
            function($http, $q) {

                function wrap(result, Model) {
                    return result.then(function(data) {
                        return new Model(data);
                    });
                }

                function Resource(endpoint, model) {
                    // this.endpoint = 'http://localhost:5000/api/' + endpoint + '/';
                    this.endpoint = '/api/' + endpoint + '/';
                    this.model = model;
                }

                Resource.prototype.get = function(id) {
                    var result = $http.get(this.endpoint + id);

                    if (this.model !== undefined) {
                        return wrap(result, this.model);
                    }

                    return result;
                };

                Resource.prototype.create = function(obj) {
                    return $http.post(this.endpoint, obj);
                };

                Resource.prototype.update = function(id, obj) {
                    return $http.put(this.endpoint + id, obj);
                };

                Resource.prototype.delete = function(id) {
                    if (!id) {
                        var deferred = $q.defer();

                        return deferred.reject('An id must be provided for delete operations');
                    }

                    return $http.delete(this.endpoint + id);
                };

                Resource.prototype.search = function() {
                    return $http.get(this.endpoint + 'all');
                };

                return Resource;
            }
        ]);

        return module;
    });
})();
