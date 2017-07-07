const assert = require('assert');

const getterCollection = require('../../../lib/get-collection');

describe('getCollection test', () => {
    it('should be a function', () => {
        assert(typeof getterCollection === 'function');
    });

    it('should return function', () => {
        const getColecction = getterCollection({ models:{} });
        assert(typeof getColecction === 'function');
    });

    it('should return a collection', () => {
        const getColecction = getterCollection({ models:{} });
        const collection = getColecction('test');
        assert(typeof collection === 'object');
    });
});
