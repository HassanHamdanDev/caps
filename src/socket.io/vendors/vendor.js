'use strict';

const io = require('socket.io-client');
var faker = require('faker');


const HOST = process.env.HOST || 'http://localhost:3000';

const serverConnection = io.connect(HOST);

let phonyData = {
    "store": "Guava",
    "orderId": faker.datatype.uuid(),
    "customer": faker.name.findName(),
    "address": faker.address.streetAddress()
}

serverConnection.on('delivered', deliveredVendor);

function deliveredVendor(payload) {
    console.log('VENDOR: Thank you  for delivering', payload.phonyData.orderId);
    console.log('VENDOR :', `Thank you ${payload.phonyData.customer}`);
}



serverConnection.emit('newOrder', {phonyData});




