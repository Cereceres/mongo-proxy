const validateData = require('./validate-data-with-schema');
const paginateQuery = require('./paginate-response');

const methodToAllowQuery = new Set(['GET', 'PUT', 'DELETE']);
const methodToAllowBody = new Set(['PUT', 'POST']);
const getRecords = require('./get-records');
const validateDataWithPermissions = require('./validate-data-with-permissions');

module.exports = async (params) => {
  const {
    collection,
    method = 'GET',
    query: _query = {},
    body: _body = {},
    schema,
    permissions,
    numDocByPage,
    url,
  } = params;
  let query = {};

  if (methodToAllowQuery.has(method)) query = await validateData(_query, schema, true);


  let body = {};
  if (methodToAllowBody.has(method)) body = await validateData(_body, schema);

  body = validateDataWithPermissions(body, permissions, method);
  const {
    records,
    thereAreMoreData,
  } = await getRecords({
    method, collection, query, body, numDocByPage,
  });
  const { nextQuery } = paginateQuery(thereAreMoreData, records);
  const response = {
    records: records
      .map(record => validateDataWithPermissions(record, permissions, method)),
  };
  if (nextQuery) response.next = `${url}?${nextQuery}`;

  return response;
};
