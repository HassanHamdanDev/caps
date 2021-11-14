'use strict';

const events = require('./events');
require('./Drivers/driver');
require('./vendors/vendor');
require('./caps')


events.on('create-order', createOrder);



function createOrder(payload) {
    events.emit('pickup', { phonyData: payload.phonyData });
    events.emit('in-transit', { phonyData: payload.phonyData });
    events.emit('delivered', { phonyData: payload.phonyData });
}

