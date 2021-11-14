'use strict';

const events = require('./events');
require('./Drivers/driver');

events.on('pickup', pickUp);
events.on('in-transit', inTransit);
events.on('deliveredEvent', deliveredEvent);


function pickUp(payload) {
    const log = {
        event: 'pickup',
        time: new Date().toString(),
        payload: payload.phonyData,
    };
    console.log('Event', log);
    events.emit('pickupDriver', { phonyData: payload.phonyData });
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
    console.log('VENDOR :', `Thank you ${payload.phonyData.customer}`);

}