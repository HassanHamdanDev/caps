'use strict';

const events = require('../src/events/events')

let data = {
    store: 'guava',
    orderId: '62fdf12b-631b-493b-a565-4b2cbc0e3094',
    customer: 'saber',
    address: 'end alamood',
}

describe('Test events', () => {
    let consoleSpy;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    it('pickup event ', async () => {
        events.emit('pickup', data);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('in-transit event ', async () => {
        events.emit('in-transit', data);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('delivered event', async () => {
        events.emit('deliveredEvent', data);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });


    afterAll(() => {
        consoleSpy.mockRestore();
    });

});