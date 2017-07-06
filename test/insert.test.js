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
        assert(res.body.test === data.test);
        assert(res.body.user === data.user);
    });


    // it('should', function(done) {
    //     this.agent
    //         .put('/user')
    //         .expect('Content-Type', 'application/json')
    //         .expect(200, (err, res) => {
    //             console.log(res.body);
    //             assert(res);
    //             done();
    //         });
    // });
});
