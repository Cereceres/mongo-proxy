const http = require('http');
const url = require('url');
const qs = require('querystring');

const getParams = require('./lib/get-params');
const Collection = require('./lib/Collection');
const _getCollection = require('./lib/get-collection');
const getCallback = require('./lib/get-callback');

const getDatabase = require('./lib/database');

module.exports = (databaseUrl = 'mongodb://localhost:27017/test', port = '8080') => {
    const PORT = port || process.env.PORT;
    const database = getDatabase(databaseUrl);
    const getCollection = _getCollection(database);
    const server = http.createServer(getCallback(getCollection));
    server.listen(PORT);
    return server;
};


