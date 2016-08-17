'use strict';

let {
    cacheProxy
} = require('..');

let assert = require('assert');

describe('index', () => {
    it('base', () => {
        let f = cacheProxy((a, b) => {
            return Math.pow(a, b);
        });

        assert.equal(f(2, 3), 8);
        assert.equal(f(2, 30), 1073741824);
    });
});
