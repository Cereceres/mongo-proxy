const assert = require('assert');

const data = {
    test:'testing',
    user:1
};

describe('description', () => {
    it('should create a document', function *() {
        const res = yield this.agent
            .post('/user')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200);
        assert(res.body.$data.test === data.test);
        assert(res.body.$data.user === data.user);
    });

    it('should get the doc created', function *() {
        const res = yield this.agent
            .get('/user')
            .query(this.query)
            .expect('Content-Type', 'application/json')
            .expect(200);
        assert(res.body.$data[0].test === data.test);
        assert(res.body.$data[0].user === data.user);
        assert(res.body.$data.length === 1);
    });
});
