const validateQuery = require('./validate-query');
const parse = require('url-parse');

module.exports = (_url = '', databaseModels = {}) => {
    const URL = parse(_url, true);
    const path = URL.pathname.slice(1).split('/');
    const query = URL.query;
    const collection = path[0];
    const schema = databaseModels[collection].schema.obj;
    return { collection: collection, query: validateQuery(query, schema) };
};