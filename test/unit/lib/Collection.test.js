const assert = require('assert');

const Collection = require('../../../lib/Collection');

const database = {
    find: () => ({ exec:() => Promise.resolve({ res:'res' }) }),
    update: (query, cb) => cb('error', { res:'result' }),
    create: (query, cb) => cb('error', { res:'result' }),
    find: (query, cb) => cb('error', { res:'result' })
};

const collection = new Collection(database);

describe('Collection test', () => {
    it('should be a collection', () => {
        assert(new Collection() instanceof Collection);
    });

    it('should have a find method', () => {
        assert(typeof collection.find === 'function');
    });
});
