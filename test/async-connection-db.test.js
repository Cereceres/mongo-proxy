const assert = require('assert');

const getAgent = require('supertest');

const { startServer } = require('../index');

let agent = null;
const db = {};
let dataCreated = null;
const getters = {
    getDatabase: () => Promise.resolve(db),
    getUserModel: (_db) => {
        assert.deepStrictEqual(_db, db);
        return {
            findOne:(query) => {
                assert(query);
                return Promise.resolve({
                    name:'test2',
                    pass:new Buffer('test').toString('base64'),
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
            }
        };
    },
    getSchemaModel: (_db) => {
        assert.deepStrictEqual(_db, db);
        return {
            findOne:(query) => {
                assert(query);
                return Promise.resolve({
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
            }
        };
    },
    getCollection: (collection) => {
        assert(collection === 'users');
        return {
            create:(query, data) => {
                assert(query);
                assert(data);
                dataCreated = data;
                return Promise.resolve([ data ]);
            },
            find:(query) => {
                assert(query);
                return Promise.resolve([ dataCreated ]);
            },
            delete:(query) => {
                assert(query);
                return Promise.resolve([ {} ]);
            },
            count: (query) => {
                assert(query);
                return Promise.resolve(10);
            },
            update:(query, body) => {
                assert(query);
                assert(body);
                return Promise.resolve([ body ]);
            }
        };
    }
};
describe('test to getters', () => {
    before(async() => {
        const server = await startServer(undefined, 8090, getters);
        agent = getAgent(server);
    });
    it('should create the doc sent', async() => {
        const { body:{ records } } = await agent
            .post('/users')
            .auth('test2', 'test')
            .send({ test:'testing', user:'2' })
            .expect('Content-Type', 'application/json')
            .expect(200);
        assert(records[0].test === 'testing');
        assert(records[0].user === '2');
    });

    it('should get the object inserted previously', (done) => {
        agent
            .get('/users')
            .auth('test2', 'test')
            .query({ user:'2' })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body:{ records, next } }) => {
                console.log('next ', next);
                assert(!next);
                assert(!err);
                assert(records[0].test === 'testing');
                assert(records[0].user === '2');
                done();
            });
    });

    it('should update the object given', (done) => {
        agent
            .put('/users')
            .query({ user:'2' })
            .auth('test2', 'test')
            .send({ test:'testing updated' })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body:{ records, done:_done } }) => {
                assert(records[0].test === 'testing updated');
                assert(!err);
                assert(_done);
                done();
            });
    });
    it('should remove the elements', (done) => {
        agent
            .delete('/users')
            .auth('test2', 'test')
            .query({ user:'2' })
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body:{ done:_done } }) => {
                assert(!err);
                assert(_done);
                done();
            });
    });
});
