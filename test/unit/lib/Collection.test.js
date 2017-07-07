const assert = require('assert');

const Collection = require('../../../lib/Collection');


describe('Collection test', () => {
    it('should be a collection', () => {
        assert(new Collection() instanceof Collection);
    });

    it('should have a find method', function *() {
        const query = { test:'test' };
        const database = {
            find: (_query) => ({ exec:() => {
                assert.deepEqual(query, _query);
                return Promise.resolve({ res:'res' });
            } }),
        };
        const collection = new Collection(database);
        const resQuery = yield collection.find(query);
        assert.deepEqual(resQuery, { res:'res' });
    });
});
