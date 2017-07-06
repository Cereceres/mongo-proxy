const agent = require('supertest');

const getCollection = require('../lib/get-collection');
const getDatabase = require('../lib/database');

const models = {
    user:{
        user: Number,
        test: String
    }
};


const databaseUrlDefault = 'mongodb://127.0.0.1:27017/test';
const database = getDatabase(databaseUrlDefault);
const collection = getCollection(database)('user', models);

const server = require('../index')(database, undefined, models);


before(function() {
    this.agent = agent(server);
    this.models = models;
    this.query = { user: 1 };
    this.collection = collection;
});

after(function() {
    return this.collection.delete(this.query);
});
