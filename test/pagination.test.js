const assert = require('assert');

const getAgent = require('supertest');

const { startServer } = require('../index');

let agent = null;
const db = {};
let dataCreated = null;
let getCollectionCallCounter = 0;
const getters = {
    getDatabase: () => db,
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
        getCollectionCallCounter++;
        assert(collection === 'users');
        return {
            create:(query, data) => {
                assert(query);
                assert(data);
                dataCreated = data;
                dataCreated._id = 1;
                return Promise.resolve([ dataCreated ]);
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
                return Promise.resolve(101);
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
        const server = await startServer(undefined, 8083, getters, { baseUrl:'/api/rest/path' });
        agent = getAgent(server);
    });
    it('should create the doc sent', async() => {
        const { body:{ records } } = await agent
            .post('/api/rest/path/users')
            .auth('test2', 'test')
            .send({ test:'testing', user:'3' })
            .expect('Content-Type', 'application/json')
            .expect(200);
        assert(getCollectionCallCounter === 1);
        assert(records[0].test === 'testing');
        assert(records[0].user === '3');
    });

    it('should get the object inserted previously', (done) => {
        agent
            .get('/api/rest/path/users')
            .auth('test2', 'test')
            .query({})
            .expect('Content-Type', 'application/json')
            .expect(200, (err, { body:{ records, next } }) => {
                assert(!err);
                assert(records[0].test === 'testing');
                assert(records[0].user === '3');
                assert(next === '/api/rest/path/users?%24gt=1');
                done();
            });
    });
});
