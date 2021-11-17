'use strict';

const PORT = process.env.PORT || 3011;
const io = require('socket.io')(PORT);
const uuid = require('uuid').v4;

const flowersQueue = {
    messeges: {}
};
const widgetsQueue = {
    messeges: {}
};

const caps = io.of('/caps');

caps.on("connection", (socket) => {
    console.log('CONNECTED to server', socket.id);
    socket.emit("welcome", 'connection Working');

    socket.on("flowersOrder", payload => {
        const id = uuid();
        flowersQueue.messeges[id] = payload.flowersPhony;
        const log = {
            event: 'pickup',
            time: new Date().toString().slice(0, 24),
            info: flowersQueue.messeges[id],
        };
        console.log('Event', log);
        caps.emit('pickup', { id: id, payload: flowersQueue.messeges[id] });
        
        socket.on('in-transit', (payload) => {
            const log = {
                event: 'in-transit',
                time: new Date().toString().slice(0, 24),
                info: payload.payload,
            };
            console.log('Event', log);

        });
        socket.on('delivered', (payload) => {
            log.event = 'delivered';
            console.log('Event', log);
            delete flowersQueue.messeges[payload.id];
        });
    });


    socket.on("widgetsOrder", payload => {
        const id = uuid();
        widgetsQueue.messeges[id] = payload.widgetsPhony;
        const log = {
            event: 'pickup',
            time: new Date().toString().slice(0, 24),
            info: widgetsQueue.messeges[id],
        };
        console.log('Event', log);
        caps.emit('pickup', { id: id, payload: widgetsQueue.messeges[id] });

        socket.on('in-transit', (payload) => {
            const log = {
                event: 'in-transit',
                time: new Date().toString().slice(0, 24),
                info: payload.payload,
            };
            console.log('Event', log);
        });
        socket.on('delivered', (payload) => {
            log.event = 'delivered';
            console.log('Event', log);
            delete widgetsQueue.messeges[payload.id];
        });
    });

    socket.on('getAll_flowersOrder', () => {
        Object.keys(flowersQueue.messeges).forEach(id => {
            caps.emit('pickup', { id: id, payload: flowersQueue.messeges[id] });
        });
    });

    socket.on('getAll_widgetsOrder', () => {
        Object.keys(widgetsQueue.messeges).forEach(id => {
            caps.emit('pickup', { id: id, payload: widgetsQueue.messeges[id] });
        });
    });
});


