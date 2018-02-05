const getParams = require('./get-params');
const success = require('./sucess');
const fail = require('./fail');
const getResponse = require('./get-response');
const getBodyParsed = require('./parse-body');
const getBody = require('./get-body');

const checkCredentialsAndGetUser = require('./check-credentials');

const messageCollectionRequired = 'Collection is required';
const messageActionNotAllowed = 'Action is not allowed';

module.exports = (getCollection, getSchema, getUser) => (req, res) => (async() => {
    const user = await checkCredentialsAndGetUser(req, getUser);
    const { method, url } = req;
    const { collection:collectionName, query } = getParams(url);

    if (!collectionName) return await Promise.reject({
        message: messageCollectionRequired,
        code: 400
    });
    const schema = await getSchema(collectionName);
    const collection = getCollection(collectionName);
    const permissions = user[collectionName] || {};
    const actions = user.actions || {};
    if (!actions && !actions && actions !== '__$all' && !actions[method]) return Promise.reject({
        message: messageActionNotAllowed,
        code: 403
    });
    const params = { collection, method, query, schema, permissions };
    const body = await getBody(req);
    params.body = getBodyParsed(body);
    return await getResponse(params);
})()
    .then(success(res))
    .catch(fail(res));

