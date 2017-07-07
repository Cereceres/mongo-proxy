const assert = require('assert');

const fail = require('../../../lib/fail');

describe('fail test', () => {
    it('should be a function', () => {
        assert(typeof fail === 'function');
    });

    it('should call the write of res object', () => {
        const resObj = { write: () => {

        } };

        
    });
});
