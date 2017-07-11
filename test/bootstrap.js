const agent = require('supertest');
const mongoose = require('mongoose');
const getCollection = require('../lib/get-collection');
const getDatabase = require('../lib/database');

const models = {
    user:{
        user: Number,
        test: String,
        otherUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'otherUser'
        }
    },
    otherUser:{
        otherUser: Number,
        something: String,
        friends: [ {
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        } ]
    }
};


const databaseUrlDefault = 'mongodb://127.0.0.1:27017/test';
const database = getDatabase(databaseUrlDefault);
database.model('user', new database.Schema(models.user));
database.model('otherUser', new database.Schema(models.otherUser));

const collection = getCollection(database, 'user')();
const otherCollection = getCollection(database, 'otherUser')();

const server = require('../index')(database);


before(function() {
    this.agent = agent(server);
    this.models = models;
    this.query = { user: 1 };
    this.collection = collection;
    this.otherCollection = otherCollection;
});

after(function() {
    return this.collection.delete({});
});
