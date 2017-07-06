const assert = require('assert');

const data = {
    test:'testing',
    user:1
};

describe('description', () => {
    it('should', function *() {
        const res = yield this.agent
            .post('/user')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200);
        assert(res.body.test === data.test);
        assert(res.body.user === data.user);
    });

    it('should', function *() {
        const res = yield this.agent
            .get('/user')
            .query(this.query)
            .expect('Content-Type', 'application/json')
            .expect(200);
        assert(res.body[0].test === data.test);
        assert(res.body[0].user === data.user);
        assert(res.body.length === 1);
    });


    it('should', function *() {
        const reponse = yield this.agent
            .put('/user')
            .send({ test:'test 2' })
            .query(this.query)
            .expect('Content-Type', 'application/json')
            .expect(200);
        const res = yield this.collection.find(this.query);
        console.log('res ===', res, response);
        assert(res.test === 'test 2');
        assert(res.user === data.user);
        assert(res.length === 1);
    });
});
