const reduceQuery = require('./reduce-query');

module.exports = (query = {}, schema = {}) => Object.keys(query)
    .reduce(reduceQuery(query, schema), {});

