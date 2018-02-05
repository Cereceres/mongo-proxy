const getParams = require('./get-params');
const onSuccess = require('./success');
const onFail = require('./fail');
const getResponse = require('./get-response');
const getBodyParsed = require('./parse-body');
const getBody = require('./get-body');
const checkCredentialsAndGetUser = require('./check-credentials-and-get-user');

const messageCollectionRequired = 'Collection is required';
const messageActionNotAllowed = 'Action is not allowed';

module.exports = (getCollection, getSchema, getUser, options = {}) => (req, res) => (
    async() => {
        const { baseUrl = '/' } = options;
        const user = await checkCredentialsAndGetUser(req, getUser);
        const { method, url } = req;
        const {
            collection:collectionName,
            query,
            _id,
            numDocByPage
        } = await getParams(url, baseUrl);

        if (!collectionName) return await Promise.reject({
            message: messageCollectionRequired,
            code: 400
        });
        const schema = await getSchema(collectionName);
        const collection = getCollection(collectionName);
        const permissions = user[collectionName] || {};
        const actions = user.actions || {};
        if (actions !== '__$all' && !actions[method]) return Promise.reject({
            message: messageActionNotAllowed,
            code: 403
        });
        const params = {
            collection,
            method,
            query: _id ? { _id } : query,
            schema,
            permissions,
            numDocByPage,
            url
        };
        const body = await getBody(req);
        params.body = getBodyParsed(body) || {};
        console.log('params.body ', params.body);
        return await getResponse(params);
    }
)()
    .then(onSuccess(res))
    .catch(onFail(res));

