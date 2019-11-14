import {
    helloWorld,
    getData,
    specialMap
} from '../utils';

// Basic Example
describe('Hello World', () => {
    const SALESFORCE = "Salesforce";

    it('Hello World is returned', () => {
        // Example asserts
        // Look at: https://jestjs.io/docs/en/expect

        // TODO
        const EXPECTED_RESULT = 'Hello World!';
        const res = helloWorld(false);
        expect(res).toBe(EXPECTED_RESULT);
        expect(res).toEqual(EXPECTED_RESULT);
        expect(res).not.toBe(null);
    });

    it('Salesforce prepended', () => {
        const EXPECTED_RESULT = `${SALESFORCE} Hello World!`
        const res = helloWorld(true);

        // Example asserts
        // Look at: https://jestjs.io/docs/en/expect

        // TODO
        expect(res).toBe(EXPECTED_RESULT);
        expect(res).toEqual(EXPECTED_RESULT);
        expect(res).not.toBe(null);

    });
});

// Asynchrounous and mocking example
describe('Get Data Suite', () => {
    it('getData gets data and modifies correctly', () => {

        // TODO
        const mockData = {
            data: {
                salesforce: true
            },
            json: jest.fn(() => Promise.resolve({data: mockData.data}))
        };

        const oldFetch = window.fetch;
        window.fetch = jest.fn(() => Promise.resolve(mockData));

        const EXPECTED_RESULT = {
            data: {
                salesforce: 'Salesforce rocks!'
            }
        };

        /**
         * const oldFetch = global.fetch;
         * global.fetch = jest.fn(() => Promise.resolve(mockData));
         * 
         * This is the same as above...node uses global instead of window...
         * doesn't really matter what you use as jest has virtual dom, thus has a window object
         * Personally if your testing UI, then use window, if testing node scripts, then use global
         */

        // Return a promise so the test waits...
        return getData().then((res) => {
            expect(res).toEqual(JSON.stringify(EXPECTED_RESULT));
            window.fetch = oldFetch;
        })

    });
});

// --- Exercise 1 --- //
// TODO: Practice simple jest test and spying
describe('map', () => {
    it("map executes on every element", () => {
        const cb = (v, i) => `value: ${v}, index: ${i}`;
        let a = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];

        // 1. Verify that the result is correct
        // 2. Verify that callback was called correctly for each element

        // TODO:

        // Test 1
        const res = specialMap(a, cb);
        a.map((val, index) => expect(res[index]).toBe(cb(val, index)));

        // Test 2
        const cbSpy = jest.fn().mockImplementation(cb);
        const res2 = specialMap(a, cbSpy);
        a.map((val, index) => {
            expect(cbSpy.mock.calls[index][0]).toBe(val);
            expect(cbSpy.mock.calls[index][1]).toBe(index);
        })
        expect(cbSpy.mock.calls.length).toBe(a.length);
    });
});
