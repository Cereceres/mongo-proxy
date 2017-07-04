const getParams = require('./get-params');
const success = require('./sucess');
const fail = require('./fail');
const getResponse = require('./get-response');

module.exports = (getCollection) => (req, res) => {
    const { method } = req;
    let { collection:collectionName, query } = getParams(req.url);
    const collection = getCollection(collectionName);
    let chunk = [];
    req.on('error', console.error)
       .on('data', (_chunk) => chunk.push(_chunk))
       .on('end', () => {
           const body = Buffer.concat(chunk).toString();
           console.log('body ', body, 'method ', method);
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
