const validateQuery = require('./validate-query');
const parse = require('url-parse');
const qs = require('querystring');

module.exports = (_url = '', models = {}, databaseModels = {}) => {
    console.log('url = ', _url);
    const URL = parse(_url, true);
    console.log('URL = ', URL);
    const path = URL.pathname.slice(1).split('/');
    const query = URL.query;
    const collection = path[0];
    const schema = models[collection] || databaseModels[collection].path;
    console.log('query = ', query, validateQuery(query, schema));
    return { collection: collection, query: validateQuery(query, schema) };
};

