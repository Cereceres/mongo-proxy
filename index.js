const http = require('http');
const url = require('url');
const qs = require('querystring');

const getterOfCollection = require('./lib/get-collection');
const getCb = require('./lib/get-cb-create-server');
const validateParams = require('./lib/validate-params.js');
const getDatabase = require('./lib/database');

const databaseUrlDefault = 'mongodb://127.0.0.1:27017/test';
const portDefault = '8080';
const dbDefault = getDatabase(databaseUrlDefault);

module.exports = (db = dbDefault, port = portDefault, models = {}) => {
    validateParams(port, models);
    const PORT = port || process.env.PORT;
    const getCollection = getterOfCollection(db);
    const server = http.createServer(getCb(getCollection, models, db));
    server.listen(PORT);
    return server;
};
