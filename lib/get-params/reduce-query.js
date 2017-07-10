const validateProperty = require('./validate-property');

module.exports = (query, schema, validate) => (init, queryKey) => {
    console.log('queryKey = ', queryKey);

    if (typeof query[queryKey] === 'object') return;

    if (schema[queryKey]) init[queryKey] = validateProperty(query[queryKey], schema[queryKey]);
    else init[queryKey] = query[queryKey];

    return init;
};
