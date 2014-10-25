import _ from 'lodash';

class Customer {

    constructor (data) {
        _(this).extend(_.omit(data, '$$hashKey'));
    }

    get name() {
        return [this.first_name, this.last_name].join(' ');
    }
}

export { Customer };
