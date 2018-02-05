const assert = require('assert');

let ID = null;
describe('test to insert', () => {
    it('should return the object inserted', async function() {
        await this.User.create({
            name:'test',
            pass:'test',
            users:{
                test:'__$all',
                user:'__$all',
                _id:'__$all'
            },
            others:{
                test:'__$all',
                user:'__$all',
                _id:'__$all'
            },
            actions:'__$all'
        });
        await this.Schema.create({
            __schema: {
                __$type:'object',
                __$properties:{
                    test:{
                        __$type:'string'
                    },
                    user:{
                        __$type:'string'
                    }
                },
                __$required:[]
            },
            __collection:'users'
        });
        const { body:{ records } } = await this.agent
            .post('/users')
            .auth('test', new Buffer('test').toString('base64'))
            .send({ test:'testing', user:'1' })
            .expect('Content-Type', 'application/json')
            .expect(200);
        ID = records[0]._id;
        assert(records[0].test === 'testing');
        assert(records[0].user === '1');
        assert(records[0]._id);
    });

    it('should get the object inserted previously', function(done) {
        this.agent
            .get('/users')
            .auth('test', new Buffer('test').toString('base64'))
            .query({ user:'1' })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body:{ records } }) => {
                assert(!err);
                assert(records[0].test === 'testing');
                assert(records[0].user === '1');
                assert(records[0]._id);
                done();
            });
    });

    it('should get the object inserted previously by ID', function(done) {
        this.agent
            .get(`/users/${ID}`)
            .auth('test', new Buffer('test').toString('base64'))
            .query({ user:'1' })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body:{ records } }) => {
                assert(!err);
                assert(records[0].test === 'testing');
                assert(records[0].user === '1');
                assert(records[0]._id === ID);
                done();
            });
    });

    it('should get the object inserted previously by ID', function(done) {
        this.agent
            .get(`/users/${1111111}`)
            .auth('test', new Buffer('test').toString('base64'))
            .query({ user:'1' })
            .expect('Content-Type', 'application/json')
            .expect(400, (err, { body }) => {
                const { error } = body;
                assert(!err);
                assert(error === 'Id must be a ObjectId valid.');
                done();
            });
    });


    it('should update the object given', function(done) {
        this.agent
            .put('/users')
            .query({ user:'1' })
            .auth('test', new Buffer('test').toString('base64'))
            .send({ test:'testing updated' })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body:{ done:_done } }) => {
                assert(!err);
                assert(_done);
                done();
            });
    });
    it('should remove the elements', function(done) {
        this.agent
            .delete('/users')
            .auth('test', new Buffer('test').toString('base64'))
            .query({ user:'1' })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body }) => {
                assert(!err);
                done();
            });
    });

    it('should  accept nested objects', async function() {
        await this.Schema.create({
            __schema: {
                __$type:'object',
                __$properties:{
                    test:{
                        __$type:'object',
                        __$properties:{
                            nested:{
                                __$type:'string'
                            }
                        }
                    },
                    user:{
                        __$type:'string'
                    }
                },
                __$required:[]
            },
            __collection:'others'
        });
        const { body:{ records } } = await this.agent
            .post('/others')
            .auth('test', new Buffer('test').toString('base64'))
            .send({ test:{ nested:'nested' }, user:'1' })
            .expect('Content-Type', 'application/json')
            .expect(200);
        assert(records[0].test.nested === 'nested');
        assert(records[0].user === '1');
        assert(records[0]._id);
    });

    it('should get the object inserted previously with nested query', function(done) {
        this.agent
            .get('/others')
            .auth('test', new Buffer('test').toString('base64'))
            .query({ 'test.nested':'nested' })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body:{ records } }) => {
                assert(!err);
                assert(records[0].test.nested === 'nested');
                assert(records[0].user === '1');
                assert(records[0]._id);
                done();
            });
    });

    it('should remove the elements', function(done) {
        this.agent
            .delete('/others')
            .auth('test', new Buffer('test').toString('base64'))
            .query({ 'test.nested':'nested' })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body:{ done:_done } }) => {
                assert(!err);
                assert(_done);
                done();
            });
    });
});
