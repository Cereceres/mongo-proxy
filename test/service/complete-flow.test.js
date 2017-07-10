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
        assert(res.body.length === 1);
    });


    it('should update the doc created', function *() {
        yield this.agent
            .put('/user')
            .send({ test:'test 2' })
            .query(this.query)
            .expect('Content-Type', 'application/json')
            .expect(200);
        const res = yield this.collection.find(this.query);
        console.log('res ===', res);
        assert(res[0].get('test') === 'test 2');
        assert(res[0].get('user') === data.user);
    });

    it('should delete the doc created', function *() {
        const response = yield this.agent
            .delete('/user')
            .query(this.query)
            .expect('Content-Type', 'application/json')
            .expect(200);
        const res = yield this.collection.find(this.query);
        console.log('res ===', res, response.body);
        assert(!res.length);
    });
});
