'use strict';

let {
    find, any
} = require('bolzano');

let defEq = (list1, list2) => any(list1, (item, index) => item === list2[index]);

module.exports = ({
    size = 1000, way = 'queue', eq = defEq
} = {}) => {
    /**
     * cache = [ [keys, value] ]
     */
    let cache = [];

    let sameKeys = (keys, item) => eq(keys, item[0]);

    return {
        add: (keys, value) => {
            if (way === 'stack') {
                cache.push([keys, value]);
                if (cache.length > size) {
                    cache.pop();
                }
            } else {
                // queue
                cache.push([keys, value]);
                if (cache.length > size) {
                    cache.shift();
                }
            }
        },

        /**
         * @return [keys, value] | undefined
         */
        getItem: (keys) => {
            return find(cache, keys, {
                eq: sameKeys
            });
        }
    };
};
