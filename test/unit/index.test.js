const assert = require('assert');
const http = require('http');
const mongoProxy = require('../../index');

describe('MongoProxy test', () => {
    it('should be a function', () => {
        assert(typeof mongoProxy === 'function');
    });

    it('should return a server instance', () => {
        assert(mongoProxy() instanceof http.Server);
    });
});
