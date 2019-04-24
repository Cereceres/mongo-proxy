const mapMethodHttpMongo = new Map([
  ['DELETE', 'delete'],
  ['GET', 'find'],
  ['POST', 'create'],
  ['PUT', 'update'],
]);


module.exports = async (params) => {
  const {
    method, collection, query, body, numDocByPage,
  } = params;
  let howManyData = 0;
  const exec = mapMethodHttpMongo.get(method)
    ? collection[mapMethodHttpMongo.get(method)]
    : () => Promise.resolve([]);
  let paramsToExec = [];
  if (method === 'GET') paramsToExec = [query, { limit: numDocByPage }];
  else if (mapMethodHttpMongo.get(method)) paramsToExec = [query, body, { new: true }];

  const records = await exec(...paramsToExec);
  if (method === 'GET') howManyData = await collection.count(query);
  return {
    records: Array.isArray(records) ? records : [records],
    thereAreMoreData: howManyData > numDocByPage,
  };
};
