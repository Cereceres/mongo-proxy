const getParams = require('./get-params');
const success = require('./sucess');
const auth = require('basic-auth');
const fail = require('./fail');
const getResponse = require('./get-response');
const getBodyParsed = require('./parse-body');
const getBody = require('./get-body');

module.exports = (getCollection, getSchema, getUser) => (req, res) => (async() => {
    const credentials = auth(req);

    if (!credentials) return Promise.reject(new Error('Credential are required'));

    const { name, pass } = credentials;
    const user = await getUser(name, pass);

    if (!user) return Promise.reject(new Error('Credential are wrong'));

    const { method, url } = req;
    const { collection:collectionName, query } = getParams(url);
    const schema = await getSchema(collectionName);
    const collection = getCollection(collectionName);
    const permissions = user[collectionName] || {};
    const params = { collection, method, query, schema, permissions };
    const body = await getBody(req);
    params.body = getBodyParsed(body);
    return await getResponse(params);
})()
    .then(success(res))
    .catch(fail(res));

