const getParams = require('./get-params');
const onSuccess = require('./success');
const onFail = require('./fail');
const getResponse = require('./get-response');
const getBodyParsed = require('./parse-body');
const getBody = require('./get-body');
const checkCredentialsAndGetUser = require('./check-credentials-and-get-user');

const messageCollectionRequired = 'Collection is required';
const messageActionNotAllowed = 'Action is not allowed';

module.exports = params => (req, res) => (
  async () => {
    const {
      getCollection,
      getSchema,
      getUser,
      getCredentialsFromReq,
      options = {},
    } = params;
    const { baseUrl = '/' } = options;
    const paramsToCheckCredentials = [
      req,
      getUser,
      getCredentialsFromReq,
    ];
    const user = await checkCredentialsAndGetUser(...paramsToCheckCredentials);
    const { method, url } = req;
    const {
      collection: collectionName,
      query,
      _id,
      numDocByPage,
    } = await getParams(url, baseUrl);

    if (!collectionName) {
      return await Promise.reject({
        message: messageCollectionRequired,
        code: 400,
      });
    }
    const schema = await getSchema(collectionName);
    const collection = getCollection(collectionName);
    const permissions = user[collectionName] || {};
    const actions = user.actions || {};
    if (actions !== '__$all' && !actions[method]) {
      return Promise.reject({
        message: messageActionNotAllowed,
        code: 403,
      });
    }

    const paramsToGetResponse = {
      collection,
      method,
      query: _id ? { _id } : query,
      schema,
      permissions,
      numDocByPage,
      url,
    };
    const body = await getBody(req);
    paramsToGetResponse.body = getBodyParsed(body) || {};
    return await getResponse(paramsToGetResponse);
  }
)()
  .then(onSuccess(res))
  .catch(onFail(res));
