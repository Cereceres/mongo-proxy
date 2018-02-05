
const validateData = require('./validate-data-with-schema');

const methodToAllowQuery = new Set([ 'GET', 'PUT', 'DELETE' ]);
const methodToAllowBody = new Set([ 'PUT', 'POST' ]);
const validateDataWithPermissions = require('./validate-data-with-permissions');
const mapMethodHttpMongo = new Map([
    [ 'DELETE', 'delete' ],
    [ 'GET', 'find' ],
    [ 'POST', 'create' ],
    [ 'PUT', 'update' ],
]);

module.exports = async(params) => {
    const {
        collection,
        method = 'GET',
        query:_query = {},
        body:_body = {},
        schema,
        permissions
    } = params;
    let query = {};

    if (methodToAllowQuery.has(method)) query = await validateData(_query, schema, true);


    let body = {};

    if (methodToAllowBody.has(method)) body = await validateData(_body, schema);

    body = validateDataWithPermissions(body, permissions, method);
    let promise = Promise.resolve([]);
    if (mapMethodHttpMongo.get(method)) promise = collection[mapMethodHttpMongo.get(method)](query, body, { new:true });

    const records = await promise;
    console.log('records ', records);
    return {
        records: records
            .map((record) => validateDataWithPermissions(record, permissions, method))
    };
};
