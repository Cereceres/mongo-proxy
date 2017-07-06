const reduceQuery = require('./reduce-query');

module.exports = (query, schema = {}) => {
    console.log('query in validate query', query);
    return Object.keys(query).reduce(reduceQuery(query, schema), {});
};
