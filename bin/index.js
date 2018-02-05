#!/usr/bin/env node

const getOptions = require('./parse-args');

const { startServer } = require('../index');
const parseGetCollection = require('./parse-get-collection');
const {
    host,
    start,
    port,
    gd: getDataBasePath,
    gum: getUserModelPath,
    gsm: getSchemaModelPath,
    gc: getCollectionPath
} = getOptions();

const getters = {};

if (getDataBasePath) getters.getDatabase = require(getDataBasePath);
if (getUserModelPath) getters.getUserModel = require(getUserModelPath);
if (getSchemaModelPath) getters.getSchemaModel = require(getSchemaModelPath);

const thereAreGetCollection = parseGetCollection(
    getCollectionPath,
    getters.getDatabase,
    host);

if (thereAreGetCollection) getters.getCollection = thereAreGetCollection.getCollection;

if (start) startServer(
    thereAreGetCollection ? thereAreGetCollection.db : host,
    port,
    getters
);
