'use strict';

const events = require('../events');

events.on('pickupDriver', pickupDriver);
events.on('delivered', deliveredDriver);


function pickupDriver(payload) {
    console.log('DRIVER', `picked up ${payload.phonyData.orderId}`);
}

function deliveredDriver(payload) {
    console.log('DRIVER:', `delivered up  ${payload.phonyData.orderId}`);
    events.emit('deliveredVendor', { phonyData: payload.phonyData });
}
