const plainObject = require('./plain-object-in-query');
const getFind = require('./get-find');
const getUpdate = require('./get-update');
const getDelete = require('./get-delete');
const getCreate = require('./get-create');

module.exports = collection => ({
  create: getCreate(collection, plainObject),
  find: getFind(collection, plainObject),
  delete: getDelete(collection, plainObject),
  count: query => plainObject(collection.countDocuments(query).exec()),
  update: getUpdate(collection, plainObject),
});
