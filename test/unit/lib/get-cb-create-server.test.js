const assert = require('assert');

const proxyquire = require('proxyquire');

const getterCb = require('../../../lib/get-cb-create-server');

describe('getterCb test', () => {
    it('should be a function', () => {
        assert(typeof getterCb === 'function');
    });

    it('should return a function', () => {
        const getCb = getterCb(() => ({}), {});
        assert(typeof getCb === 'function');
    });
});
