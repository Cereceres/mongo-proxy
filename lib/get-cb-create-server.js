const getParams = require('./get-params');
const success = require('./sucess');
const fail = require('./fail');
const getResponse = require('./get-response');

module.exports = (getCollection, models, database) => (req, res) => {
    const modelsAvailables = new Set(Object.keys(models));
    console.log('modelsAvailables ', modelsAvailables);
    const { method } = req;
    let { collection:collectionName, query } = getParams(req.url, models, database.models);
    console.log('collectionName ', collectionName);
    if (!modelsAvailables.has(collectionName)) return fail(res, 404)(new Error('Collection not available'));
    const optionsToMongo = models[collectionName];
    const collection = getCollection(collectionName, optionsToMongo);
    let chunk = [];
    req.on('error', console.error)
       .on('data', (_chunk) => chunk.push(_chunk))
       .on('end', () => {
           const body = Buffer.concat(chunk).toString();
           console.log('method, query, body', method, query, body);
           getResponse(collection, method, query, getBodyParsed(body))
            .then(success(res))
            .catch(fail(res));
       });
};


const getBodyParsed = (body) => {
    try {
        return JSON.parse(body);
    } catch (e) {
        return body;
    }
};
