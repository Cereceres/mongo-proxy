const assert = require('assert');

const fail = require('../../../lib/fail');

describe('fail test', () => {
    it('should be a function', () => {
        assert(typeof fail === 'function');
    });

    it('should call the write of res object', () => {
        const status = 700;
        const error = new Error('this error happen');
        const resObj = { write: (response) => {
            console.log('response : ', response);

            assert(JSON.parse(response));
        } };
        fail(resObj, status, error)();
    });
});
