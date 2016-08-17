'use strict';

let cache = require('../src/cache');

let assert = require('assert');

let jsoneq = require('cl-jsoneq');

describe('cache', () => {
    it('base', () => {
        let {
            add, getItem
        } = cache({
            size: 10
        });

        add([1, 2, 3], 10);

        add([1, {},
            3
        ], 10);

        assert.equal(getItem([1, 2, 3])[1], 10);

        assert.equal(getItem([1, {},
            3
        ]), undefined);
    });

    it('jsoneq', () => {
        let {
            add, getItem
        } = cache({
            size: 10,
            eq: jsoneq
        });

        add([1, {
            a: 1,
            b: 3
        }], 10);

        assert.deepEqual(getItem([1, {
            a: 1,
            b: 3
        }]), [
            [1, {
                a: 1,
                b: 3
            }], 10
        ]);
    });

    it('queue', () => {
        let {
            add, getItem
        } = cache({
            size: 10
        });

        add([0], 100);

        for (let i = 0; i < 9; i++) {
            add([i + 10], 0);
        }

        assert.equal(getItem([0])[1], 100);

        add([876], 9);

        assert.equal(getItem([0]), undefined);
    });

});
