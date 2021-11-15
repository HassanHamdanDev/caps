'use strict';


const io = require('socket.io-client');


const HOST = process.env.HOST || 'http://localhost:3000';

const serverConnection = io.connect(HOST);

serverConnection.on('pickup', pickupDriver);
serverConnection.on('delivered', deliveredDriver);


function pickupDriver(payload) {
    console.log('DRIVER', `picked up ${payload.phonyData.orderId}`);
}

function deliveredDriver(payload) {
    console.log('DRIVER:', `delivered up  ${payload.phonyData.orderId}`);
    serverConnection.emit('delivered', { phonyData: payload.phonyData });
}
