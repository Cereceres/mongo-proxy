const reduceQuery = require('./reduce-query');

const validate = module.exports = (query = {}, schema = {}) => Object.keys(query)
    .reduce(reduceQuery(query, schema, validate), {});

