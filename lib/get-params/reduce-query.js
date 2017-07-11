const validateProperty = require('./validate-property');

const { keys } = Object;

module.exports = (query, schema, validate) => (init, queryKey) => {
    console.log('queryKey = ', queryKey);
    if (!schema[queryKey]) {
        init[queryKey] = query[queryKey];
        return init;
    }

    let isObjectIt = typeof query[queryKey] === 'object';
    isObjectIt = isObjectIt && keys(query[queryKey]).length;
    isObjectIt = isObjectIt && schema(query[queryKey]).length;
    isObjectIt = isObjectIt && typeof schema[queryKey] === 'object';

    if (isObjectIt) init[queryKey] = validate(query[queryKey], schema[queryKey]);
    else init[queryKey] = validateProperty(query[queryKey], schema[queryKey]);

    return init;
};
