const validateProperty = require('./validate-property');

module.exports = (query, schema) => (init, queryKey) => {
    console.log('queryKey = ', queryKey);

    if (schema[queryKey]) init[queryKey] = validateProperty(query[queryKey], schema[queryKey]);
    else init[queryKey] = query[queryKey];

    return init;
};
