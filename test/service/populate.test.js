const assert = require('assert');

describe('Populate service', () => {
    before(function *() {
        const user1 = yield this.agent
            .post('/user')
            .send({
                user: 1,
                test: 'test 1'
            });

        const user2 = yield this.agent
            .post('/user')
            .send({
                user: 2,
                test: 'test 2'
            });

        const otherUser = yield this.agent
            .post('/otherUser')
            .send({
                user: 2,
                test: 'test 2',
                friends:[ user1.$data._id, user2.$data._id ]
            });

        yield this.agent
            .put('/user')
            .query({
                user: 1
            })
            .send({ otherUser: otherUser._id });

        yield this.agent
            .put('/user')
            .query({
                user: 2
            })
            .send({ otherUser: otherUser._id });


        console.log('data ===', user1, user2, otherUser);
    });

    it('should get the doc populated', function *() {
        const res = yield this.agent
            .get('/user')
            .query(this.query)
            .expect('Content-Type', 'application/json')
            .expect(200);
        console.log('res ===', res.body);
        assert(res.body.$data);
    });
});
