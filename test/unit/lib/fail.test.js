const assert = require('assert');

const fail = require('../../../lib/fail');

describe('fail test', () => {
    it('should be a function', () => {
        assert(typeof fail === 'function');
    });

    it('should return a function', () => {
        const functionReturned = fail();
        assert(typeof functionReturned === 'function');
    });

    it('should call the write of res object', () => {
        const status = 700;
        const error = new Error('this error happen');
        const resObj = { write: (response) => {
            const _res = JSON.parse(response);
            assert.deepEqual(_res.headers, { 'Content-Type':'application/json' });
            assert.deepEqual(_res.body, { error:'this error happen' });
            assert.equal(_res.statusCode, status);
        } };
        fail(resObj, status, error)();
    });
});
