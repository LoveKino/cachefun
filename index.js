'use strict';

let cache = require('./src/cache');

let cacheProxy = (fun, opts) => {
    let {
        add, getItem
    } = cache(opts);

    return function() {
        let ret = undefined;
        let args = Array.prototype.slice.call(arguments);
        //cache first
        let v = getItem(args);

        if (!v) {
            ret = fun.apply(this, args);
            // cache it
            add(args, ret);
        } else {
            ret = v[1];
        }

        return ret;
    };
};

module.exports = {
    cacheProxy
};
