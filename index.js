const http = require('http');

const getGetterCollection = require('./lib/get-getter-collection');
const getCallback = require('./lib/get-callback');
const getDatabase = require('./lib/database');
const getGetterSchema = require('./lib/get-getter-schema');
const getModelSchema = require('./lib/get-getter-schema/get-model-schema');
const getUserModel = require('./lib/get-getter-user/get-model-user');
const getGetterUser = require('./lib/get-getter-user');

const mongoHostDefault = 'mongodb://localhost:27017/test';
const portDefault = '8080';

module.exports = (databaseUrl = mongoHostDefault, port = portDefault) => {
    const PORT = port || process.env.PORT;
    const database = getDatabase(databaseUrl);
    const ModelSchema = getModelSchema(database);
    const ModelUser = getUserModel(database);
    const getUser = getGetterUser(ModelUser);
    const getSchema = getGetterSchema(ModelSchema);
    const getCollection = getGetterCollection(database);
    const serverCallback = getCallback(getCollection, getSchema, getUser);
    const server = http.createServer(serverCallback);
    server.listen(PORT);
    return server;
};


