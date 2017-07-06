const agent = require('supertest');

const getCollection = require('../lib/get-collection');
const getDatabase = require('../lib/database');

const models = {
    user:{
        user: Number,
        test: String
    }
};


const databaseUrlDefault = 'mongodb://localhost:27017/test';
const database = getDatabase(databaseUrlDefault);
const collection = getCollection(database)('user', models);

const server = require('../index')(database, undefined, models);


before(function() {
    this.agent = agent(server);
    this.models = models;
    this.query = { user: 1 };
});

after(function() {
    return collection.delete(this.query);
});
