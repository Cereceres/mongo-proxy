const assert = require('assert');

const ProxyError = require('../lib/ProxyError');


describe('test to ProxyError', () => {
  it('should instance the class', () => {
    const error = new ProxyError(200, 'error');
    assert(error.code = 200);
    assert(error.message = 'error');
  });

  it('should instance the class', () => {
    const error = new ProxyError(200);
    assert(error.code = 200);
    assert(error.message = 'Internal error.');
  });

  it('should instance the class', () => {
    const error = new ProxyError('error');
    assert(error.code = 500);
    assert(error.message = 'error');
  });
});
