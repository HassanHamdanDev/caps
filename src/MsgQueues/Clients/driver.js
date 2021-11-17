'use strict';

const client = require('socket.io-client');

const HOST = "http://localhost:3011/caps";

const socket = client.connect(HOST);

socket.on("welcome", (data) => {
    console.log('received', data);
});

socket.emit('getAll_flowersOrder');
socket.emit('getAll_widgetsOrder');

socket.on('pickup', (payload) => {
    console.log('DRIVER', `order picked up `);
    socket.emit('in-transit', { payload });
    console.log('DRIVER:', `oreder delivered up  `);
    socket.emit('delivered', { payload });

});

// function pickupDriver(payload) {
//     console.log('DRIVER', `order picked up `);
//     socket.emit('in-transit', { payload });
// }

// socket.on('delivered', deliveredDriver);

// function deliveredDriver(payload) {
//     // socket.emit('delivered', payload);
// }