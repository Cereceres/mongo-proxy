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

    it('should have a update method', function *() {
        const query = { test:'test' };
        const data = { user:'user' };
        const database = {
            update: (_query, _data) => ({ exec:() => {
                assert.deepEqual(query, _query);
                assert.deepEqual(data, _data);
                return Promise.resolve({ res:'res' });
            } }),
        };
        const collection = new Collection(database);
        const resQuery = yield collection.update(query, data);
        assert.deepEqual(resQuery, { res:'res' });
    });

    it('should have a delete method', function *() {
        const query = { test:'test' };
        const database = {
            deleteMany: (_query) => ({ exec:() => {
                assert.deepEqual(query, _query);
                return Promise.resolve({ res:'res' });
            } }),
        };
        const collection = new Collection(database);
        const resQuery = yield collection.delete(query);
        assert.deepEqual(resQuery, { res:'res' });
    });

    it('should have a create method', function *() {
        const data = { test:'test' };
        const database = {
            create: (_data) => {
                assert.deepEqual(data, _data);
                return Promise.resolve({ res:'res' });
            },
        };
        const collection = new Collection(database);
        const resData = yield collection.find(data);
        assert.deepEqual(resData, { res:'res' });
    });
});
