const getParams = require('./get-params');
const success = require('./sucess');
const fail = require('./fail');
const getResponse = require('./get-response');

const getBodyParsed = (body) => {
    try {
        return JSON.parse(body);
    } catch (e) {
        return body;
    }
};

const errorMessage = 'Collection not available';

module.exports = (getCollection, { models }) => (req, res) => {
    const modelsAvailables = new Set(Object.keys(models));
    const { method } = req;
    const { collection:collectionName, query } = getParams(req.url, models);
    console.log('modelsAvailables ', modelsAvailables, collectionName, query);
    if (!modelsAvailables.has(collectionName)) return fail(res, 404, new Error(errorMessage))();

    const collection = getCollection(collectionName);
    let chunk = [];
    req.on('error', console.error)
       .on('data', (_chunk) => chunk.push(_chunk))
       .on('end', () => {
           const body = Buffer.concat(chunk).toString();
           getResponse(collection, method, query, getBodyParsed(body))
            .then(success(res))
            .catch(fail(res));
       });
};


