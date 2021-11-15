'use strict';

const io = require('socket.io-client');

const HOST = process.env.HOST || 'http://localhost:3000';
const serverConnection = io.connect(HOST);

serverConnection.on('pickup', pickUp);
serverConnection.on('in-transit', inTransit);
serverConnection.on('delivered', deliveredEvent);


function pickUp(payload) {
    const log = {
        event: 'pickup',
        time: new Date().toString(),
        payload: payload.phonyData,
    };
    console.log('Event', log);
    serverConnection.emit('pickup', { phonyData: payload.phonyData });
}


function inTransit(payload) {
    const log = {
        event: 'in-transit',
        time: new Date().toString(),
        payload: payload.phonyData,
    };
    console.log('Event', log);
}

function deliveredEvent(payload) {
    const log = {
        event: 'delivered',
        time: new Date().toString(),
        payload: payload.phonyData,
    };
    console.log('Event', log);
}