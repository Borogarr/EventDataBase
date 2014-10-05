(function() {
    'use strict';

    define([
        'require',
        'lodash',
    ], function(require, _) {

        function Customer(obj) {
            _(this).extend(_.omit(obj, '$$hashKey'));
        }

        Object.defineProperty(Customer.prototype, 'name', {
            get: function() {
                return this.first_name + ' ' + this.last_name;
            }
        });

        return Customer;
    });
})();

