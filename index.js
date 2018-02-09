const http = require('http');

const ProxyError = require('./lib/ProxyError');
const getGetterCollection = require('./lib/get-getter-collection');
const getCallback = require('./lib/get-callback');
const getGetterSchema = require('./lib/get-getter-schema');
const _getDatabase = require('./lib/database');
const _getSchemaModel = require('./lib/get-getter-schema/get-model-schema');
const _getUserModel = require('./lib/get-getter-user/get-model-user');
const getGetterUser = require('./lib/get-getter-user');

const dbHost = 'mongodb://localhost:27017/test';
const portDefault = process.env.PORT || '8080';

const _getMiddleware = exports.getMiddleware = async(_dbUrl, getters = {}, options) => {
    const dbUrl = _dbUrl || dbHost;
    const {
        getDatabase = _getDatabase,
        getUserModel = _getUserModel,
        getSchemaModel = _getSchemaModel,
        getCollection:_getCollection,
        getCredentialsFromReq
    } = getters;
    const db = typeof dbUrl === 'object' ? dbUrl : await getDatabase(dbUrl);
    const ModelSchema = getSchemaModel(db);
    const ModelUser = getUserModel(db);
    const getUser = getGetterUser(ModelUser);
    const getSchema = getGetterSchema(ModelSchema);
    const getCollection = _getCollection || getGetterCollection(db);
    const paramsToGetCallback = {
        getCollection,
        getSchema,
        getUser,
        options,
        getCredentialsFromReq
    };
    return getCallback(paramsToGetCallback);
};

const _getServer = exports.getServer = async(dbUrl, getters = {}, options) => {
    const { getMiddleware = _getMiddleware } = getters;
    const serverCallback = await getMiddleware(dbUrl, getters, options);
    return http.createServer(serverCallback);
};

exports.startServer = async(dbUrl, _port, getters = {}, options = {}) => {
    let port = _port || portDefault;
    if (typeof port === 'object') {
        options = getters || options;
        getters = port;
        port = portDefault;
    }
    const { getServer = _getServer } = getters;
    const server = await getServer(dbUrl, getters, options);
    server.listen(port, () => console.log('Mongo proxy is listening on : ', port));
    return server;
};

exports.ProxyError = ProxyError;


