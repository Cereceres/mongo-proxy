const http = require('http');

const getterOfCollection = require('./lib/get-collection');
const getCb = require('./lib/get-cb-create-server');
const getDatabase = require('./lib/database');

const databaseUrlDefault = 'mongodb://127.0.0.1:27017/test';
const portDefault = process.env.PORT || '8080';
const dbDefault = getDatabase(databaseUrlDefault);

const getServer = module.exports = (database = dbDefault, port = portDefault) => {
    const getCollection = getterOfCollection(database);
    const cb = getCb(getCollection, database);
    const server = http.createServer(cb);
    server.listen(port);
    return server;
};

if (!module.parent) getServer();

