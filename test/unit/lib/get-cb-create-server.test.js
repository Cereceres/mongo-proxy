const assert = require('assert');

const getterCb = require('../../../lib/get-cb-create-server');

describe('getterCb test', () => {
    it('should be a function', () => {
        assert(typeof getterCb === 'function');
    });

    it('should return a function', () => {
        assert(typeof getterCb() === 'function');
    });
});


