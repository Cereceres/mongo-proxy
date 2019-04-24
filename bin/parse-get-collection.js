module.exports = (getCollectionPath, getDatabase, host) => {
  if (!getCollectionPath || !getDatabase) return;
  const getGetterCollection = require(getCollectionPath);
  const db = getDatabase(host);
  const getCollection = getGetterCollection(db);
  return { db, getCollection };
};
