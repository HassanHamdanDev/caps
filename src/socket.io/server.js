'use strict';

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

io.on('connection', (socket) => {
    console.log('CONNECTED', socket.id);
    socket.on('newOrder', handleNewOrder);
});



function handleNewOrder(payload) {
    io.emit('pickup', { phonyData: payload.phonyData });
    io.emit('in-transit', { phonyData: payload.phonyData });
    io.emit('delivered', { phonyData: payload.phonyData });
}

