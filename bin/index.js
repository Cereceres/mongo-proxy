#!/usr/bin/env node

const getOptions = require('./parse-args');

const { startServer } = require('../index');
const parseGetCollection = require('./parse-get-collection');

const {
  host,
  start,
  port,
  burl,
  gd: getDataBasePath,
  gum: getUserModelPath,
  gsm: getSchemaModelPath,
  gc: getCollectionPath,
  gcfr: getCredentialsFromReqPath,
} = getOptions();

const getters = {};

if (getDataBasePath) getters.getDatabase = require(getDataBasePath);
if (getUserModelPath) getters.getUserModel = require(getUserModelPath);
if (getSchemaModelPath) getters.getSchemaModel = require(getSchemaModelPath);
if (getCredentialsFromReqPath) getters.getCredentialsFromReq = require(getCredentialsFromReqPath);

const thereAreGetCollection = parseGetCollection(
  getCollectionPath,
  getters.getDatabase,
  host,
);

if (thereAreGetCollection) getters.getCollection = thereAreGetCollection.getCollection;

if (start) {
  startServer(
    thereAreGetCollection ? thereAreGetCollection.db : host,
    port,
    getters,
    { baseUrl: burl },
  );
}
