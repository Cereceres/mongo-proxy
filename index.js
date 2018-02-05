const http = require('http');

const getGetterCollection = require('./lib/get-getter-collection');
const getCallback = require('./lib/get-callback');
const getGetterSchema = require('./lib/get-getter-schema');
const _getDatabase = require('./lib/database');
const _getSchemaModel = require('./lib/get-getter-schema/get-model-schema');
const _getUserModel = require('./lib/get-getter-user/get-model-user');
const getGetterUser = require('./lib/get-getter-user');

const dbHost = 'mongodb://localhost:27017/test';
const portDefault = process.env.PORT || '8080';

const _getMiddleware = exports.getMiddleware = (dbUrl, getters = {}) => {
    console.log('getters = ', getters);
    const {
        getDatabase = _getDatabase,
        getUserModel = _getUserModel,
        getSchemaModel = _getSchemaModel,
        getCollection:_getCollection
    } = getters;
    console.log('getDatabase ', getDatabase);
    const db = getDatabase(dbUrl);
    const ModelSchema = getSchemaModel(db);
    const ModelUser = getUserModel(db);
    const getUser = getGetterUser(ModelUser);
    const getSchema = getGetterSchema(ModelSchema);
    const getCollection = _getCollection || getGetterCollection(db);
    return getCallback(getCollection, getSchema, getUser);
};

const _getServer = exports.getServer = (dbUrl, getters = {}) => {
    const { getMiddleware = _getMiddleware } = getters;
    const serverCallback = getMiddleware(dbUrl, getters);
    return http.createServer(serverCallback);
};

exports.startServer = (dbUrl, port = portDefault, getters = {}) => {
    const { getServer = _getServer } = getters;
    const server = getServer(dbUrl, getters);
    server.listen(port);
    return server;
};


