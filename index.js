const http = require('http');
const url = require('url');
const qs = require('querystring');

const _getCollection = require('./lib/get-collection');
const getCallback = require('./lib/get-callback');
const validateParams = require('./lib/validate-params.js');
const getDatabase = require('./lib/database');

const databaseUrlDefault = 'mongodb://127.0.0.1:27017/test';
const portDefault = '8080';
const defaultDatabase = getDatabase(databaseUrlDefault);

module.exports = (database = defaultDatabase, port = portDefault, models = {}) => {
    validateParams(port, models);
    const PORT = port || process.env.PORT;
    const getCollection = _getCollection(database);
    const server = http.createServer(getCallback(getCollection, models, database));
    server.listen(PORT);
    return server;
};


