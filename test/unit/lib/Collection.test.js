const assert = require('assert');

const Collection = require('../../../lib/Collection');

describe('Collection test', () => {
    it('should be a collection', () => {
        assert(new Collection() instanceof Collection);
    });
});
