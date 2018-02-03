const getParams = require('./get-params');
const success = require('./sucess');
const auth = require('basic-auth');
const fail = require('./fail');
const getResponse = require('./get-response');
const getBodyParsed = require('./parse-body');

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
    const chunk = [];
    const permissions = user[collectionName] || {};
    const params = { collection, method, query, schema, permissions };
    req.on('error', fail(res))
        .on('data', (_chunk) => chunk.push(_chunk))
        .on('end', () => {
            const body = Buffer.concat(chunk).toString();
            params.body = getBodyParsed(body);
            getResponse(params)
                .then(success(res))
                .catch(fail(res));
        });
})()
    .catch(fail(res));

