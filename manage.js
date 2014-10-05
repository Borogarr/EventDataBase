var fs = require('fs');
var sys = require('sys');
var faker = require('faker');

var COUNT = 200;

var customers = [];

for (var i = 0; i < COUNT; i++) {
    customers.push({
        customer_id: i,
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone_number: faker.phone.phoneNumber(),
        events: []
    });
}

fs.writeFile('./app/customers/customers.json',  JSON.stringify(customers), function() {
  sys.puts('Customers generated successfully!');
});
