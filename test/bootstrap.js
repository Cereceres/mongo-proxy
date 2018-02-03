const agent = require('supertest');

const db = require('../lib/database')('mongodb://localhost:27017/test');
const getSchemaModel = require('../lib/get-getter-schema/get-model-schema');
const getUserModel = require('../lib/get-getter-user/get-model-user');

const Schema = getSchemaModel(db);
const User = getUserModel(db);

const { startServer } = require('../index');

before(function() {
    this.agent = agent(startServer());
    this.Schema = Schema;
    this.User = User;
});

after(async function() {
    await this.Schema.delete({});
});
