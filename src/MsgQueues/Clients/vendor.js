'use strict';

const client = require('socket.io-client');

const HOST = "http://localhost:3011/caps";

const socket = client.connect(HOST);

var faker = require('faker');

let flowersPhony = {
    "store": "1-800-flowers",
    "orderId": faker.datatype.uuid(),
    "customer": faker.name.findName(),
    "address": faker.address.streetAddress()
}
let widgetsPhony = {
    "store": "acme-widgets",
    "orderId": faker.datatype.uuid(),
    "customer": faker.name.findName(),
    "address": faker.address.streetAddress()
}

socket.on("welcome", (data) => {
    console.log('received', data);
});

socket.emit('flowersOrder', { flowersPhony });
socket.emit('widgetsOrder', { widgetsPhony });

socket.on('delivered', (payload) => {
    console.log('VENDOR: Thank you  for delivering');
    console.log('VENDOR :', `Thank you `);
});


