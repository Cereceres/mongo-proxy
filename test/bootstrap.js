const agent = require('supertest');

const server = require('../index')();

before(function() {
    this.agent = agent(server);
});
