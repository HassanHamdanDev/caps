'use strict';

const events = require('../events');
var faker = require('faker');


let phonyData = {
    "store": "Guava",
    "orderId": faker.datatype.uuid(),
    "customer": faker.name.findName(),
    "address": faker.address.streetAddress()
}

events.on('deliveredVendor', deliveredVendor);

function deliveredVendor(payload) {
    console.log('VENDOR: Thank you  for delivering', payload.phonyData.orderId);
    events.emit('deliveredEvent', { phonyData: payload.phonyData });
}

setInterval(() => {
console.log('===============================');
events.emit('create-order', { phonyData });
console.log('===============================');
}, 2000);

