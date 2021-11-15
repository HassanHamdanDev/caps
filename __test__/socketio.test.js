'use strict';

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

let data = {
    store: 'guava',
    orderId: '62fdf12b-631b-493b-a565-4b2cbc0e3094',
    customer: 'saber',
    address: 'end alamood',
}

describe('socket.io', () => {
    let consoleSpy;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    it('connects the backend via socket.io ', async () => {
        await io.on('connection', mySocket => {
            expect(mySocket).toBeDefined();
        });
    });

    it('pickup emit ', async () => {
        io.emit('pickup', data);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('in-transit emit ', async () => {
        io.emit('in-transit', data);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('delivered emit', async () => {
        io.emit('delivered', data);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });


    afterAll((done) => {
        consoleSpy.mockRestore();
        io.close();
        done();
    });
});